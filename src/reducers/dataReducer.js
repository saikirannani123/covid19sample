import { SUMMARY_SUCCESS, SUMMARY_FAILURE, WORLD_TOTAL_SUCCESS, WORLD_TOTAL_FAILURE, LIVE_SUCCESS, LIVE_FAILURE, BY_COUNTRY_SUCCESS, BY_COUNTRY_FAILURE } from 'actions/types'
const INITIAL_STATE = {
    login: '',
    summary: [],
    summaryFailed: '',
    worldTotal: [],
    worldTotalFailed: '',
    countrylive: [],
    liveFailed: '',
    byCountry: [],
    byCountryFailed: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
    
        case SUMMARY_SUCCESS:
            return {
                ...state,
                summary: action.payload
            }
        case SUMMARY_FAILURE:
            return {
                ...state,
                summaryFailed: action.payload
            }
        case WORLD_TOTAL_SUCCESS:
            return {
                ...state,
                worldTotal: action.payload
            }
        case WORLD_TOTAL_FAILURE:
            return {
                ...state,
                worldTotalFailed: action.payload
            }
        case LIVE_SUCCESS:
            return {
                ...state,
                countrylive: action.payload
            }
        case LIVE_FAILURE:
            return {
                ...state,
                liveFailed: action.payload
            }
        case BY_COUNTRY_SUCCESS:
            return {
                ...state,
                byCountry: action.payload
            }
        case BY_COUNTRY_FAILURE:
            return {
                ...state,
                byCountryFailed: action.payload
            }
        default:
            return state;
    }
};