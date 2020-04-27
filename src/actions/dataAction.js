import {LOGIN_SUCCESS, SUMMARY_SUCCESS, SUMMARY_FAILURE, WORLD_TOTAL_SUCCESS, WORLD_TOTAL_FAILURE, LIVE_SUCCESS, LIVE_FAILURE, BY_COUNTRY_SUCCESS, BY_COUNTRY_FAILURE} from './types'
import {GET_SUMMARY, GET_WORLD_TOTAL, GET_LIVE_BY_COUNTRY, GET_BY_COUNTRY_TOTAL } from 'api/Constants'
import { getAxios } from 'api/Api';

export const login = data => ({
    type: LOGIN_SUCCESS,
    payload: data,
  });

  export const getSummary = () => {
    return dispatch => {
      getAxios(GET_SUMMARY,{},() => {},(resp)=>{
       if(resp.status === 200){
         dispatch({
           type: SUMMARY_SUCCESS,
           payload: resp.data
         })
       }else{
         dispatch({
           type: SUMMARY_FAILURE,
           payload: 'Failed to get data'
         })
       }
      })
    }
  }

  export const getStats = () => {
    return dispatch => {
      getAxios(GET_WORLD_TOTAL,{},() => {},(resp)=>{
       if(resp.status === 200){
         dispatch({
           type: WORLD_TOTAL_SUCCESS,
           payload: resp.data
         })
       }else{
         dispatch({
           type: WORLD_TOTAL_FAILURE,
           payload: 'Failed to get data'
         })
       }
      })
    }
  }

  export const getLiveByCountry = () => {
    return dispatch => {
      getAxios(GET_LIVE_BY_COUNTRY,{},() => {},(resp)=>{
       if(resp.status === 200){
         dispatch({
           type: LIVE_SUCCESS,
           payload: resp.data
         })
       }else{
         dispatch({
           type: LIVE_FAILURE,
           payload: 'Failed to get data'
         })
       }
      })
    }
  }

  export const getByCountry = () => {
    return dispatch => {
      getAxios(GET_BY_COUNTRY_TOTAL,{},() => {},(resp)=>{
        console.log("RESPONSEE ======", resp)
       if(resp.status === 200){
         dispatch({
           type: BY_COUNTRY_SUCCESS,
           payload: resp.data
         })
       }else{
         dispatch({
           type: BY_COUNTRY_FAILURE,
           payload: 'Failed to get data'
         })
       }
      })
    }
  }