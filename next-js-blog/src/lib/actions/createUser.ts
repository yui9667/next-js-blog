'use server';
import { registerSchema } from '@/validation/user';
import { prisma } from '../prisma';
import bcryptjs from 'bcryptjs';
import { signIn } from '@/auth';
import { redirect } from 'next/navigation';
import { ZodError } from 'zod';
type ActionState = {
  success: boolean;
  errors: Record<string, string[]>;
};

//*Validation error
function handleValidationError(error: ZodError): ActionState {
  const { fieldErrors, formErrors } = error.flatten();
  //*zodの仕様でパスワード一致確認のエラーはForm Errorsで渡ってくる
  //*FormErrorsがある場合、Confirm Password フィールドにエラーを追加
  if (formErrors.length > 0) {
    return {
      success: false,
      errors: { ...fieldErrors, confirmPassword: formErrors },
    };
  }
  return {
    success: false,
    errors: Object.fromEntries(
      Object.entries(fieldErrors).filter(([_, value]) => value !== undefined)
    ) as Record<string, string[]>,
  };
}
//*カスタムエラー処理
function handleError(customErrors: Record<string, string[]>): ActionState {
  return { success: false, errors: customErrors };
}

export async function createUser(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  //*Form から渡ってきた情報を取得
  const rawFormData = Object.fromEntries(
    ['name', 'email', 'password', 'confirmPassword'].map((field) => [
      field,
      formData.get(field) as string,
    ])
  ) as Record<string, string>;
  //*Validation
  const validationResult = registerSchema.safeParse(rawFormData);
  if (!validationResult.success) {
    return handleValidationError(validationResult.error);
  }
  //*DBにメールアドレスが存在しているのか確認
  const existingUser = await prisma.user.findUnique({
    where: { email: rawFormData.email },
  });
  if (existingUser) {
    return handleError({ email: ['This email is already existed'] });
  }

  //*DBに登録
  const hashedPassword = await bcryptjs.hash(rawFormData.password, 12);
  await prisma.user.create({
    data: {
      name: rawFormData.name,
      email: rawFormData.email,
      password: hashedPassword,
    },
  });
  //*Dashboardにリダイレクト
  await signIn('credentials', {
    ...Object.fromEntries(formData),
    redirect: false,
  });
  redirect('/dashboard');
}
