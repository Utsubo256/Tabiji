import * as React from 'react';
import { useCallback } from 'react';
import { useNavigate, Link as RouterLink} from 'react-router-dom';
import { Box, Button, Drawer, DrawerBody, DrawerContent, Flex, Heading, IconButton, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

import { Link } from '@/components/Elements/Link/Link';

type MenuIconButtonProps = {
  onOpen: () => void;
}

function MenuIconButton(props: MenuIconButtonProps) {
  const { onOpen } = props;
  return (
    <IconButton
      aria-label="メニューボタン"
      icon={<HamburgerIcon />}
      size="sm"
      variant="unstyled"
      display={{ base: "block", md: "none" }}
      onClick={onOpen}
    />
  );
}

type MenuDrawerProps = {
  onClose: () => void;
  isOpen: boolean;
  onClickHome: () => void;
  onClickProfile: () => void;
  onClickSetting: () => void;
}

function MenuDrawer(props: MenuDrawerProps) {
  const { onClose, isOpen, onClickHome, onClickProfile, onClickSetting} = props;

  return (
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerContent>
        <DrawerBody as="nav" p={0} bg="gray.100">
          <Button
            w="100%"
            onClick={() => {
              onClickHome()
              onClose()
            }}
          >
            TOP
          </Button>
          <Button
            w="100%"
            onClick={() => {
              onClickProfile()
              onClose()
            }}
          >
            プロフィール
          </Button>
          <Button
            w="100%"
            onClick={() => {
              onClickSetting()
              onClose()
            }}
          >
            設定
          </Button>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const onClickHome = useCallback(() => navigate('/'), []);
  const onClickProfile = useCallback(() => navigate('/'), []);
  const onClickSetting = useCallback(() => navigate('/'), []);

  return (
    <>
      <Flex as="nav" bg="teal.500" color="gray.50" align="center" justify="space-between" padding={{ base: 3, md: 5 }}>
        <Flex align="center" as={RouterLink} mr={8} _hover={{ cursor: "pointer" }} to="/">
          <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>
            Tabiji
          </Heading>
        </Flex>
        <Flex align="center" fontSize="sm" flexGrow={2} display={{ base: "none", md: "flex" }}>
          <Box pr={4}>
            <Link as={RouterLink} to='/'>プロフィール</Link>
          </Box>
          <Link as={RouterLink} to='/'>設定</Link>
        </Flex>
        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <MenuDrawer isOpen={isOpen} onClose={onClose} onClickHome={onClickHome} onClickProfile={onClickProfile} onClickSetting={onClickSetting} />
    </>
  );
}

type MainLayoutProps = {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { isOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const onClickHome = useCallback(() => navigate('/'), []);
  const onClickSetting = useCallback(() => navigate('/'), []);

  return (
    <>
      <Header />
      <MenuDrawer isOpen={isOpen} onClose={onClose} onClickHome={onClickHome} onClickProfile={onClickHome} onClickSetting={onClickSetting} />
      {children}
    </>
  );
}
