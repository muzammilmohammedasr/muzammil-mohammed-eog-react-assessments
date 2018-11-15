import * as actions from "../actions";

const initialState = {
  loading: false,
  weatherId: null,
  name: "",
  temperature: "",
  weather_state_name: "",
  latitude: 34.580561374078435,
  longitude: -96.7156714770266,
  data: {}
};

const toF = c => (c * 9) / 5 + 32;

const startLoading = (state, action) => {
  return { ...state, loading: true };
};

const weatherIDReceived = (state, action) => {
  return { ...state, weatherId: action.id };
};

const weatherDataRecevied = (state, action) => {
  const { data } = action.apidata;
  //if (!data) return state;
  const longitude = action.apidata.longitude;
  const latitude = action.apidata.latitude;
  console.log("long " + longitude);
  console.log("lat " + latitude);
  return {
    ...state,
    loading: false,
    latitude,
    longitude,
    data: action.data
  };
};

const handlers = {
  [actions.FETCH_WEATHER]: startLoading,
  [actions.WEATHER_ID_RECEIVED]: weatherIDReceived,
  [actions.WEATHER_DATA_RECEIVED]: weatherDataRecevied
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
