import { useCallback, useEffect, useState } from "react";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, Grid2, Stack, Typography } from "@mui/material"

import { useAppDispatch, useAppSelector } from "./storage/hooks";
import { addItem, deselectType, removeItem, selectPlants, selectPlantsCount, selectTotalPrice, selectType } from "./features/plantsSlice";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import backgroundImage from "./landingbackground.jpg";
import "./App.css"

const App = () => {
	const [page, setPage] = useState(0);
	// const [shoppingCartCounter, setShoppingCartCounter] = useState(0);
	const [open, setOpen] = useState(false);
	const plants = useAppSelector(selectPlants);
	const plantsCounter = useAppSelector(selectPlantsCount);
	const priceTotal = useAppSelector(selectTotalPrice);

	const dispatch = useAppDispatch()
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const onClickNavigation = useCallback((index: number) => {
		setPage(index)
	}, [])

	const onClickAddTypeToCart = useCallback((index: number, price: number) => {
		console.log("onClickAddTypeToCart")
		// setShoppingCartCounter(prev => prev + 1);
		dispatch(selectType(index));
	}, [dispatch])

	const onClickRemoveTypeToCart = useCallback((index: number, price: number) => {
		console.log("onClickAddTypeToCart")
		// setShoppingCartCounter(prev => prev + 1);
		dispatch(deselectType(index));
	}, [dispatch])

	const onClickAddUnitToCart = useCallback((index: number, price: number) => {
		console.log("onClickAddTypeToCart")
		// setShoppingCartCounter(prev => prev + 1);
		dispatch(addItem(index));
	}, [dispatch])

	const onClickRemoveUnitToCart = useCallback((index: number, price: number) => {
		console.log("onClickRemoveUnitToCart")
		// setShoppingCartCounter(prev => prev + 1);
		dispatch(removeItem(index));
	}, [dispatch])

	useEffect(() => {
		console.log(plants)
	}, [plants]);

	return (
		<div className="App">
			<header>
				<Grid2
					container
					sx={{
						justifyContent: "space-between"
					}}
				>
					<Grid2
						container
						spacing={3}
					>
						<Grid2>
							Paradise Nursery
						</Grid2>
						<Grid2>
							<button
								// className={styles.button}
								aria-label="Product Listing"
								onClick={() => onClickNavigation(1)}
							>
								PRODUCT LISTING
							</button>
						</Grid2>
						<Grid2>
							<button
								// className={styles.button}
								aria-label="Shopping Cart"
								onClick={() => onClickNavigation(2)}
							>
								SHOPPING CART
							</button>
						</Grid2>
					</Grid2>
					<Grid2
						container
						spacing={3}
					>
						<Grid2>
							<ShoppingCartIcon />
						</Grid2>
						<Grid2>
							<Typography>
								{plantsCounter}
							</Typography>
						</Grid2>
					</Grid2>
				</Grid2>
			</header>
			<Box
				id="hello"
				sx={{
					width: '100%',
					height: '100vh',
					backgroundImage: `url("${backgroundImage}")`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			>

				<header className="App-header">
					<Box
						sx={{
							display: (page === 0 ? "inline" : "none")
						}}
					>
						<Card
							sx={{ maxWidth: 345 }}
						>
							<CardContent>
								<Typography gutterBottom variant="h5" component="div">
									Paradise Nursery is dedicated to serving its community by offering only the freshest and most based digital-based flowers on the market. Each coin is
									tested for quality by each member of staff, accounting for the variable hardness of teeth in humans. We also promise to replace any coin with a new one,
									provided you are able to return the old coin.
								</Typography>
							</CardContent>
							<CardActions>
								<Button
									size="small"
									onClick={() => onClickNavigation(1)}
								>
									GET STARTED
								</Button>
							</CardActions>
						</Card>
					</Box>
					<Box
						sx={{
							display: (page === 1 ? "inline" : "none")
						}}
					>
						<Grid2
							container
							spacing={2}
						// justifyContent={"center"}
						>
							<Grid2
								container
							>
								<Grid2
									size={{
										xs: 12
									}}
								>
									<Typography>
										GROUP 1
									</Typography>
								</Grid2>
								{plants
									.filter(p => p.category === 1)
									.map(p => {
										return (
											<Grid2
												key={p.id}

											>
												<Card
													sx={{ maxWidth: 345 }}
												>
													<CardMedia
														component="img"
														sx={{ height: 200 }}
														image={`./${p.thumbnail}.jpg`}
														title={p.name}
													/>
													<CardContent>
														<Typography gutterBottom variant="h5" component="div">
															{p.name}
														</Typography>
														<Typography variant="body2" sx={{ color: 'text.secondary' }}>
															{p.price}
														</Typography>
													</CardContent>
													<CardActions>
														<Button
															disabled={p.selected}
															size="small"
															onClick={() => onClickAddTypeToCart(p.id, p.price)}
														>
															Add to Cart
														</Button>
													</CardActions>
												</Card>
											</Grid2>
										)
									})}
							</Grid2>
							<Grid2
								container
							>
								<Grid2
									size={{
										xs: 12
									}}
								>
									<Typography>
										GROUP 2
									</Typography>
								</Grid2>
								{plants
									.filter(p => p.category === 2)
									.map(p => {

										return (
											<Grid2
												key={p.id}

											>
												<Card
													sx={{ maxWidth: 345 }}
												>
													<CardMedia
														component="img"
														sx={{ height: 200 }}
														image={`./${p.thumbnail}.jpg`}
														title={p.name}
													/>
													<CardContent>
														<Typography gutterBottom variant="h5" component="div">
															{p.name}
														</Typography>
														<Typography variant="body2" sx={{ color: 'text.secondary' }}>
															{p.price}
														</Typography>
													</CardContent>
													<CardActions>
														<Button
															disabled={p.selected}
															size="small"
															onClick={() => onClickAddTypeToCart(p.id, p.price)}
														>
															Add to Cart
														</Button>
													</CardActions>
												</Card>
											</Grid2>
										)
									})}
							</Grid2>
							<Grid2
								container
							>
								<Grid2
									size={{
										xs: 12
									}}
								>
									<Typography>
										GROUP 3
									</Typography>
								</Grid2>
								{plants
									.filter(p => p.category === 3)
									.map(p => {

										return (
											<Grid2
												key={p.id}

											>
												<Card
													sx={{ maxWidth: 345 }}
												>
													<CardMedia
														component="img"
														sx={{ height: 200 }}
														image={`./${p.thumbnail}.jpg`}
														title={p.name}
													/>
													<CardContent>
														<Typography gutterBottom variant="h5" component="div">
															{p.name}
														</Typography>
														<Typography variant="body2" sx={{ color: 'text.secondary' }}>
															{p.price}
														</Typography>
													</CardContent>
													<CardActions>
														<Button
															disabled={p.selected}
															size="small"
															onClick={() => onClickAddTypeToCart(p.id, p.price)}
														>
															Add to Cart
														</Button>
													</CardActions>
												</Card>
											</Grid2>
										)
									})}
							</Grid2>
						</Grid2>
					</Box>
					<Box
						sx={{
							display: (page === 2 ? "inline" : "none")
						}}
					>
						<Grid2
							container
							spacing={2}
						// justifyContent={"center"}
						>
							<Grid2
								container
							>
								{plants
									.filter(p => p.selected)
									.map(p => {
										return (
											<Grid2
												key={p.id}
											>
												<Card
													sx={{ maxWidth: 345 }}
												>
													<CardMedia
														component="img"
														sx={{ height: 200 }}
														image={`./${p.thumbnail}.jpg`}
														title={p.name}
													/>
													<CardContent>
														<Typography gutterBottom variant="h5" component="div">
															{p.name}
														</Typography>
														<Typography variant="body2" sx={{ color: 'text.secondary' }}>
															{p.price}
														</Typography>
													</CardContent>
													<CardActions>
														<Button
															// disabled={p.selected}
															size="small"
															onClick={() => onClickAddUnitToCart(p.id, p.price)}
														>
															+
														</Button>
														<Button
															// disabled={p.selected}
															size="small"
															onClick={() => onClickRemoveUnitToCart(p.id, p.price)}
														>
															-
														</Button>
														<Button
															// disabled={p.selected}
															size="small"
															onClick={() => onClickRemoveTypeToCart(p.id, p.price)}
														>
															DELETE
														</Button>
													</CardActions>
												</Card>
											</Grid2>
										)
									})}
							</Grid2>
							<Grid2
								container
							>
								<Grid2
									size={{
										xs: 12
									}}
								>
									<Typography>
										{plantsCounter}
									</Typography>
								</Grid2>
								<Grid2
									size={{
										xs: 12
									}}
								>
									<Typography>
										{priceTotal}
									</Typography>
								</Grid2>
								{/* <Grid2
									size={{
										xs: 12
									}}
								>
									<Button
										// disabled={p.selected}
										size="small"
									// onClick={() => onClickAddTypeToCart(p.id, p.price)}
									>
										CHECKOUT
									</Button>
								</Grid2> */}
								<Grid2
									size={{
										xs: 12
									}}
								>
									<Button variant="outlined" onClick={handleClickOpen}>
										CHECKOUT
									</Button>
									<Dialog
										open={open}
										onClose={handleClose}
										aria-labelledby="alert-dialog-title"
										aria-describedby="alert-dialog-description"
									>
										<DialogContent>
											<DialogContentText id="alert-dialog-description">
												COMING SOON!
											</DialogContentText>
										</DialogContent>
										<DialogActions>
											<Button onClick={handleClose} autoFocus>
												OK
											</Button>
										</DialogActions>
									</Dialog>
									<Button
										// disabled={p.selected}
										size="small"
										onClick={() => onClickNavigation(1)}
									>
										CONTINUE SHOPPING
									</Button>
								</Grid2>
							</Grid2>
						</Grid2>
					</Box>
				</header>
			</Box >
		</div >
	)
}

export default App
