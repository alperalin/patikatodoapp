import React from 'react';
import './App.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

interface Todo {
	id: number;
	text: string;
	category: Category;
}

interface Category {
	id: number;
	name: string;
	statu?: {
		id: number;
		name: string;
	};
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

function App() {
	// STATES
	const [value, setValue] = React.useState(0);
	const [isLogin, setIsLogin] = React.useState<boolean>(false);
	const [categoryList, setCategoryList] = React.useState<Category[]>([]);
	const [categorySelect, setCategorySelect] = React.useState('');
	const [categoryText, setCategoryText] = React.useState<string>('');
	const [statu, setStatu] = React.useState('');
	const [todoList, setTodoList] = React.useState<Todo[]>([]);
	const [todoText, setTodoText] = React.useState<string>('');
	const [open, setOpen] = React.useState(false);

	// FUNCTIONS
	const handleCategorySelectChange = (event: SelectChangeEvent) => {
		setCategorySelect(event.target.value as string);
	};

	const handleStatuChange = (event: SelectChangeEvent) => {
		setStatu(event.target.value as string);
	};

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const handleSubmit = (event: React.SyntheticEvent) => {
		event.preventDefault();
		setTodoList([
			...todoList,
			{
				id: Math.round(Math.random() * 1000),
				text: todoText,
				category: {
					id: Math.round(Math.random() * 1000),
					name: categorySelect,
					statu: {
						id: Math.round(Math.random() * 1000),
						name: statu,
					},
				},
			},
		]);
	};

	const handleCategorySubmit = (event: React.SyntheticEvent) => {
		event.preventDefault();
		setCategoryList([
			...categoryList,
			{
				id: Math.round(Math.random() * 1000),
				name: categoryText,
			},
		]);
	};

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<>
			{isLogin ? (
				<Box sx={{ width: '100%' }}>
					<h1>TodoList</h1>
					<Box
						component="form"
						sx={{
							'& .MuiTextField-root': { m: 1, width: '25ch' },
						}}
						noValidate
						autoComplete="off"
						onSubmit={handleSubmit}
					>
						<TextField
							id="todoInput"
							label="Todo Metni"
							placeholder="Todo Metni"
							onChange={(event: any) => {
								setTodoText(event.target.value);
							}}
							value={todoText}
							required
						/>
						<FormControl sx={{ m: 1, minWidth: 120 }}>
							<InputLabel id="demo-simple-select-label">Kategori</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="categorySelect"
								value={categorySelect}
								label="Kategori"
								onChange={handleCategorySelectChange}
							>
								{categoryList.map((category) => (
									<MenuItem value={category.id.toString()}>
										{category.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<FormControl sx={{ m: 1, minWidth: 120 }}>
							<InputLabel id="demo-simple-select-label">Statu</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="statuSelect"
								value={statu}
								label="Kategori"
								onChange={handleStatuChange}
							>
								<MenuItem value={10}>Statu 1</MenuItem>
								<MenuItem value={20}>Statu 2</MenuItem>
								<MenuItem value={30}>Statu 3</MenuItem>
							</Select>
						</FormControl>
						<br />
						<Button type="submit" variant="contained">
							Ekle
						</Button>
					</Box>

					<h2>TODOS</h2>
					<Box
						sx={{
							'& .MuiTextField-root': { m: 1, width: '25ch' },
						}}
					>
						<List
							sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
						>
							{todoList.map((todo) => (
								<ListItem key={todo.id}>
									<ListItemText
										primary={`${todo.text} ${todo.category.name} ${
											todo.category.statu ? todo.category.statu.name : ''
										}`}
									/>
								</ListItem>
							))}
						</List>
					</Box>

					<Button type="button" variant="contained" onClick={handleOpen}>
						Kategori duzenle
					</Button>

					<Modal
						open={open}
						onClose={handleClose}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<Box sx={style}>
							<Typography id="modal-modal-title" variant="h6" component="h2">
								Kategorileri Duzenle
							</Typography>
							<Typography id="modal-modal-description" sx={{ mt: 2 }}>
								Asagida kategorileri duzenleyebilirsiniz.
							</Typography>
							<Box
								component="form"
								sx={{
									'& .MuiTextField-root': { m: 1, width: '25ch' },
								}}
								noValidate
								autoComplete="off"
								onSubmit={handleCategorySubmit}
							>
								<TextField
									id="todoInput"
									label="Todo Metni"
									placeholder="Todo Metni"
									onChange={(event: any) => {
										setCategoryText(event.target.value);
									}}
									value={categoryText}
									required
								/>
								<br />
								<Button type="submit" variant="contained">
									Kategori Ekle
								</Button>
							</Box>

							<h5>Kategoriler</h5>
							<Box
								sx={{
									'& .MuiTextField-root': { m: 1, width: '25ch' },
								}}
							>
								<List
									sx={{
										width: '100%',
										maxWidth: 360,
										bgcolor: 'background.paper',
									}}
								>
									{categoryList.map((category) => (
										<ListItem key={category.id}>
											<ListItemText primary={`${category.name}`} />
										</ListItem>
									))}
								</List>
							</Box>
						</Box>
					</Modal>
				</Box>
			) : (
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
							<Button variant="contained" onClick={() => setIsLogin(true)}>
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
							<Button variant="contained" onClick={() => setIsLogin(true)}>
								Kayit Ol
							</Button>
						</Box>
					</TabPanel>
				</Box>
			)}
		</>
	);
}

export default App;
