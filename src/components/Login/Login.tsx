import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

interface LoginProps {
	onSubmit: (login: boolean) => void;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

function Login({ onSubmit }: LoginProps) {
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const handleSubmit = (event: React.SyntheticEvent) => {
		onSubmit(true);
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="basic tabs example"
				>
					<Tab label="Login" {...a11yProps(0)} />
					<Tab label="Register" {...a11yProps(1)} />
				</Tabs>
			</Box>
			<TabPanel value={value} index={0}>
				<Box
					component="form"
					sx={{
						'& .MuiTextField-root': { m: 1, width: '25ch' },
					}}
					noValidate
					autoComplete="off"
				>
					<TextField
						id="username"
						label="Kullanici Ismi"
						placeholder="Kullanici Ismi"
						required
					/>
					<TextField
						id="password"
						label="Password"
						type="password"
						autoComplete="current-password"
						required
					/>
					<br />
					<Button variant="contained" onClick={handleSubmit}>
						Giris Yap
					</Button>
				</Box>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<Box
					component="form"
					sx={{
						'& .MuiTextField-root': { m: 1, width: '25ch' },
					}}
					noValidate
					autoComplete="off"
				>
					<TextField
						id="username"
						label="Kullanici Ismi"
						placeholder="Kullanici Ismi"
						required
					/>
					<TextField
						id="password"
						label="Password"
						type="password"
						autoComplete="current-password"
						required
					/>
					<br />
					<Button variant="contained" onClick={handleSubmit}>
						Kayit Ol
					</Button>
				</Box>
			</TabPanel>
		</Box>
	);
}

export default Login;
