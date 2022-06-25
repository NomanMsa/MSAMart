
const initialState = {
    filterData: '',
    category: '',
    subCategories: [],
    titleText: '',
    titleImageUrl: '',
    categoryBannerData: [],
    categoryId: 0,
    slugUrl: '',
}

const FilterData = (state = initialState, action) => {


    if (action.type === 'UPDATE_CATEGORY_DATA') {
        return {
            filterData: action.paylod.filterData,
            category: action.paylod.category,
            subCategories: action.paylod.subCategories,
            titleText: action.paylod.titleText,
            categoryBannerData: action.paylod.categoryBannerData,
            categoryId: action.paylod.categoryId,
            slugUrl: action.paylod.slugUrl,
        }
    }

    if (action.type === 'CLEAR_CATEGORY_DATA') {
        return {
            filterData: action.paylod.filterData,
            category: action.paylod.category,
            subCategories: state.subCategories,
            titleText: state.titleText,
            categoryBannerData: state.categoryBannerData,
            categoryId: state.categoryId,
            slugUrl: state.slugUrl,
        }
    }

    if (action.type === 'UPDATE_FILTER_DATA') {
        return {
            filterData: action.paylod.filterData,
            category: action.paylod.category,
            subCategories: state.subCategories,
            titleText: state.titleText,
            categoryBannerData: state.categoryBannerData,
            categoryId: state.categoryId,
            slugUrl: state.slugUrl,
        }
    }

    if (action.type === 'CLEAR_FILTERDATA') {
        return {
            filterData: '',
            category: '',
            subCategories: [],
            titleText: '',
            categoryBannerData: [],
            categoryId: 0,
            slugUrl: '',
        }
    }
    return state
}
export default FilterData