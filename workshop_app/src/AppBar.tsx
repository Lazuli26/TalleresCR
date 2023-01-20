import { Box, AppBar, Toolbar, Typography, IconButton, alpha, InputBase, styled, Popover, Button, Avatar, Card, CardActions, CardHeader } from "@mui/material";
import { PropsWithChildren, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { UserSessionProvider } from "./Login";
import React from "react";
import { red } from "@mui/material/colors";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export const ApplicationBar: React.FC<PropsWithChildren> = ({ children }) => {

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const session = React.useContext(UserSessionProvider)

    const accButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleAccPopClose = () => {
        setAnchorEl(null);
    };

    const accountPopover_open = Boolean(anchorEl)

    const accountPopOverId = accountPopover_open ? 'simple-popover' : undefined;

    const AccountAvatar = <Avatar src={session?.session?.user.photoURL ?? undefined} sx={{ bgcolor: red[500] }} aria-label="recipe">
        {session?.session?.user?.displayName?.charAt(0) ?? "A"}
    </Avatar>
    return <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    La mejor aplicación del mundo
                </Typography>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="open-profile"
                    sx={{ mr: 2 }}
                    onClick={accButtonClick}
                    disabled={!session?.session}
                >
                    
{AccountAvatar}

                </IconButton>
                <Popover
                    id={accountPopOverId}
                    open={accountPopover_open}
                    anchorEl={anchorEl}
                    onClose={handleAccPopClose}

                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <Card sx={{ maxWidth: 345 }}>
                        <CardHeader
                            avatar={AccountAvatar}
                            title={session?.session?.user.displayName ?? "Anónimo"}
                            subheader={session?.session?.user.email ?? ""}
                        />
                        <CardActions disableSpacing>
                            <Button variant="text" color="warning" onClick={session?.signOut} children="Cerrar sesión" />
                        </CardActions>
                    </Card>
                </Popover>
            </Toolbar>
        </AppBar>
    </Box>
}