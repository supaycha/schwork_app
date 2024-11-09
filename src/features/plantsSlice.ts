import type { PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit"
import { createAppSlice } from "../storage/createAppSlice"

interface Item {
	id: number;
	thumbnail: string;
	name: string;
	price: number;
	category: number;
	selected: boolean;
	quantity: number;
};

interface PlantsSliceState {
	items: {
		byId: {
			[key: number]: Item;
		};
		allIds: number[];
	};
	selectedItems: number[];
};

const initialState: PlantsSliceState = {
	"items": {
		"byId": {
			"1": { "id": 1, "thumbnail": "spiderplant", "name": "Spider Plant", "price": 10.0, "category": 1, "selected": false, "quantity": 0 },
			"2": { "id": 2, "thumbnail": "peacelily", "name": "Peace Lily", "price": 15.0, "category": 2, "selected": false, "quantity": 0 },
			"3": { "id": 3, "thumbnail": "aloevera", "name": "Aloe Vera", "price": 20.0, "category": 1, "selected": false, "quantity": 0 },
			"4": { "id": 4, "thumbnail": "goldenpothos", "name": "Golden Pothos", "price": 25.0, "category": 3, "selected": false, "quantity": 0 },
			"5": { "id": 5, "thumbnail": "jadeplant", "name": "Jade Plant", "price": 30.0, "category": 2, "selected": false, "quantity": 0 },
			"6": { "id": 6, "thumbnail": "philobrasil", "name": "Philodendron Brasil", "price": 35.0, "category": 3, "selected": false, "quantity": 0 }
		},
		"allIds": [1, 2, 3, 4, 5, 6]
	},
	"selectedItems": []
}


// If you are not using async thunks you can use the standalone `createSlice`.
export const plantsSlice = createAppSlice({
	name: "plants",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: create => ({
		selectType: (state, action: PayloadAction<number>) => {
			const itemId = action.payload;
			if (state.items.byId[itemId]) {
				state.items.byId[itemId].selected = true;
				if (!state.selectedItems.includes(itemId)) {
					state.selectedItems.push(itemId);
				}
				state.items.byId[itemId].quantity = state.items.byId[itemId].quantity + 1;
			}
		},
		deselectType: (state, action: PayloadAction<number>) => {
			const itemId = action.payload;
			if (state.items.byId[itemId]) {
				state.items.byId[itemId].selected = false;
				state.selectedItems = state.selectedItems.filter(id => id !== itemId);
				state.items.byId[itemId].quantity = 0;
			}
		},
		addItem: (state, action: PayloadAction<number>) => {
			const itemId = action.payload;
			if (state.items.byId[itemId]) {
				state.items.byId[itemId].selected = true;
				if (!state.selectedItems.includes(itemId)) {
					state.selectedItems.push(itemId);
				}
				state.items.byId[itemId].quantity = state.items.byId[itemId].quantity + 1;
			}
		},
		removeItem: (state, action: PayloadAction<number>) => {
			const itemId = action.payload;
			if (state.items.byId[itemId]) {
				state.items.byId[itemId].selected = true;
				if (!state.selectedItems.includes(itemId)) {
					state.selectedItems.push(itemId);
				}
				state.items.byId[itemId].quantity = state.items.byId[itemId].quantity <= 1 ? 1 : state.items.byId[itemId].quantity - 1;
			}
		},	
	}),
	// You can define your selectors here. These selectors receive the slice
	// state as their first argument.
	selectors: {
		selectPlants: createSelector((state: PlantsSliceState) => state.items.byId, byId => Object.values(byId)),
		selectPlantsCount: createSelector(
			[
				(state: PlantsSliceState) => state.items.byId,
				(state: PlantsSliceState) => state.selectedItems
			],
			(itemsById, selectedItems) => {
				return selectedItems.reduce((total, itemId) => total + itemsById[itemId].quantity, 0);
			}
		),
		selectTotalPrice: createSelector(
			[
				(state: PlantsSliceState) => state.items.byId,
				(state: PlantsSliceState) => state.selectedItems
			],
			(itemsById, selectedItems) => {
				return selectedItems.reduce((total, itemId) => {
					return total + (itemsById[itemId].price * itemsById[itemId].quantity)
				}, 0);
			}
		),
	},
})

// Action creators are generated for each case reducer function.
export const {
	selectType,
	deselectType,
	addItem,
	removeItem
	// increment,
	// incrementByAmount,
	// incrementAsync,
} =
	plantsSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
	selectPlants,
	selectPlantsCount,
	selectTotalPrice,
} = plantsSlice.selectors
