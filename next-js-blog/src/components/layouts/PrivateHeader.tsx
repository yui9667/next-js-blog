import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

export default async function PrivateHeader() {
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
      </div>
    </header>
  );
}
