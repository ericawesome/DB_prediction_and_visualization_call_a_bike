# awesome_prediction_call_a_bike (24h hackathon)


(1) First Part of the MVP is a **Prediction model for the supply of bicycles for call-a-bike at 200 stations in Hamburg**. Based on the provided data from the years 2014-2015 and considering weather data (temperature, wind speed, precipitation), holidays, school holidays.

(2) Second Part of the MVP is a **Visualization of the rootes from the station to understand the relocation of the bikes during the day**. 

With the model (GradientBoostingRegressor) we predicted with 10 features used the demand with a accuracy of 76% in average.

The seasonality of demand for Call-a-Bike bicycles in Hamburg over the two years is shown below:
![Bikes_rented_in_HH_Paulinenplatz_Wohlwillstraße_2014_2015](https://user-images.githubusercontent.com/48921737/61579240-4dcc5880-ab03-11e9-827f-42594791860c.jpg)

The prediction model provides after 24h a first good approach to the real data:
![Bike_prediction_vs_real_demand](https://user-images.githubusercontent.com/48921737/61579246-56249380-ab03-11e9-9d42-d4f1429f00b7.jpg)

