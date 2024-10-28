import React, { useState, useEffect } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiUsers,
  FiUser,
  FiArchive,
  FiBook,
  FiBookOpen,
  FiFile,
  FiBookmark,
  FiCamera,
  FiCheck,
  FiPocket,
  FiMessageCircle,
  FiFileText,
  FiLayout,
  FiMessageSquare,
  FiPlus,
  FiLayers,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import AddNewSection from '../addNew/index'
import ClientDashboard from '../dashboard/index'
import AddNewCategory from '../addNewCategory/index'
import Template from '../../components/templates'
import  {getCookiesData} from '../../lib/getCookieData'
import Editor from '../template-category/index'
import axios from "axios";
import TemplateCategory from '../template-category/index';
import AddSubUser from '../addSubUser/index'
interface LinkItemProps {
  name: string;
  icon: IconType;
  subLinks?: LinkItemProps[];
  id?: string;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  id?: string;
  children: React.ReactNode;
  setNav: Function;
  subLinks?: LinkItemProps[];
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
  user: any;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  setNav: Function;
   user: any;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Dashboard', icon: FiLayout, id: 'dashboard' },
  {
    name: 'Blog Articles',
    icon: FiFileText,
    id: 'BlogArticles',
    subLinks: [
      { name: 'Add New', icon: FiPlus,  id: 'addnew' },
	  { name: 'Add Template', icon: FiPlus,  id: 'addTemplate' },
	  { name: 'Categories', icon: FiLayers,  id: 'addNewCategory'},
    ],
  },
  { name: 'Comments', icon: FiMessageSquare,  id: 'sample' },
  { name: 'Media', icon: FiCamera,  id: 'sample' },
  { name: 'Users', icon: FiUser,
  id: 'users',
 subLinks: [
      { name: 'Add New', icon: FiUsers, id: 'addNewUser' },
    ],
  },
  { name: 'Settings', icon: FiSettings, id: 'sample'},
];

const MainLinkItems: Array<LinkItemProps> = [
  { name: 'Settings', icon: FiSettings, id: 'sample'},
];


const SidebarContent = ({ onClose, user,  setNav, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={'#232536'}
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      color={'white'}
 	  display="flex"
      flexDirection="column"
      {...rest}
    >

      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <img src="logo.png" alt="logo" /> 
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (<Box  key={link.name}> 
   {user ? user.ids && link.id == "users"  ? "" :
       <NavItem icon={link.icon} id={link.id} subLinks={link.subLinks} setNav={setNav}>
          {link.name}
        </NavItem> : ""
   }

		</Box>
      
      ))}

	  <NavItem icon={FiPocket} setNav={setNav} id={''} position={'absolute'} bottom={'0'} marginBottom={'5'} mx={'5'} _hover={'none'}>
         Send Feedback
      </NavItem>
    </Box>
  );
};

const NavItem = ({ icon, children, subLinks, id, setNav, ...rest }: NavItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubLinks = (id :any) => {
    setIsOpen(!isOpen);
	setNav(id) 
  };
  return (
    <Box>
      <Box
        as="a"
        href="#"
        style={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}
      >
        <Flex
          align="center"
          p="2"
          mx="5"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: '#FFD050',
            color: 'white',
          }}
          onClick={(e) => toggleSubLinks(id)}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Box>
      {subLinks && isOpen && (
        <Box pl={8}>
          {subLinks.map((subLink) => (
            <Flex key={subLink.name} align="center" p="2" cursor="pointer" _hover={{ bg: '#FFD050' }} onClick={(e) => setNav(subLink.id)}>
              <Icon as={subLink.icon} mr="4" />
              <Text>{subLink.name}</Text>
            </Flex>
          ))}
        </Box>
      )}
    </Box>
  );
};

const MobileNav = ({ user, onOpen, ...rest }: MobileProps) => {

const  handleLogout = async () => {
	const res = await axios.post('/api/users/logout')
	 let origin = window.location.origin
     window.location.href = `${origin}/login`
}
	  
  return (
    <Flex
      ml={{ base: 0, md: 50 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={'#232536'}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
		color="white"
		border='none'
        icon={<FiMenu />}
      />
      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton color="white" size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
               	<Avatar name={`${user ? user.firstName.charAt(0).toUpperCase()+ user.firstName.slice(1) : ""} ${user ? user.lastName.charAt(0).toUpperCase()+ user.lastName.slice(1) : ""}`} />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                  color="white"
                >
                  <Text fontSize="sm" color="white">{user ? user.firstName.charAt(0).toUpperCase()+ user.firstName.slice(1) : ""} {user ?  user.lastName.charAt(0).toUpperCase()+ user.lastName.slice(1) : ""}</Text>
                  <Text fontSize="xs" color="white">{user ? user.userType.charAt(0).toUpperCase()+ user.userType.slice(1) : ""}</Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown color="white" />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem onClick={(e) => handleLogout()}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export const SidebarWithHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nav, setNav] = useState('');
 	const [user, setUser] = useState()

	useEffect(() => {
      getCookieUserData()
	}, [])

  const getCookieUserData = async () => {
	const data = await getCookiesData()
	let user =  JSON.parse(data)
	console.log(user.firstName)
	setUser(user)
  }

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'white')}>
      <SidebarContent user={user} onClose={onClose} display={{ base: 'none', md: 'block' }}   setNav={setNav}/>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent user={user} onClose={onClose} setNav={setNav} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} user={user}/>
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* Content */}
        { nav === 'addnew'  && (<AddNewSection/>) }
        { nav === 'addTemplate'  && (<Template user={user}/>) } 
		{ nav === 'addNewCategory'  && (<TemplateCategory user={user}/>) } 
		{ nav === 'addNewUser'  && (<AddSubUser user={user}/>) } 
        { nav === 'dashboard'  && (<ClientDashboard user={user}/>) } 
      </Box>
    </Box>
  );
};
