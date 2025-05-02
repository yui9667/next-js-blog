import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import Setting from './Setting';
import { auth } from '@/auth';
export default async function PrivateHeader() {
  const session = await auth();
  if (!session?.user?.email) throw new Error('Bad Request');
  return (
    <header className='border-b bg-blue-200'>
      <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                href='/dashboard'
                className='font-bold text-xl'
              >
                manage page
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Setting session={session} />
      </div>
    </header>
  );
}
