# awesome_DeutscheBahn_call_a_bike (24h hackathon)


(1) First Part of the MVP is a **Prediction model for the supply of bicycles for call-a-bike at 200 stations in Hamburg**. Based on the provided data from the years 2014-2015 and considering weather data (temperature, wind speed, precipitation), holidays, school holidays.

(2) Second Part of the MVP is a **Visualization of the rootes from the station to understand the relocation of the bikes during the day**. 

* The seasonality of demand for Call-a-Bike bicycles in Hamburg over the two years is shown below:
![Bikes_rented_in_HH_Paulinenplatz_Wohlwillstraße_2014_2015](https://user-images.githubusercontent.com/48921737/61579240-4dcc5880-ab03-11e9-827f-42594791860c.jpg)

* With the model (GradientBoostingRegressor > RandomForestRegressor) we predicted with 10 features the bookings of shared bicycles with an average accuracy of 74%. The forecasting model provides a first good approach to real data after 24 hours of hacking, but can be improved with a little more feature engineering and aggregation of data from nearby car rental stations:
![Bike_prediction_vs_real_demand](https://user-images.githubusercontent.com/48921737/61579246-56249380-ab03-11e9-9d42-d4f1429f00b7.jpg)

* While the peak values are over-projected in January, the models forecast the peak values under-proportionally in August. This can be improved by increasing the data available to the models. The difference between GBR and RF is that RF anomalies are worse predicted in both examples. 
![Bike prediction in August](https://user-images.githubusercontent.com/8559822/61579498-20cd7500-ab06-11e9-8cd6-47933f8a8710.PNG)

* The visualization shows the usage of ways. So the map shows the dentisy of ways used as well to which destinations the users are going what will help the bike-supply to take into account how many bikes need to be delivered due to the usage of the service.
![Bike_rootes](https://user-images.githubusercontent.com/48921737/61579646-4ce9f580-ab08-11e9-9f68-13679a73c2a4.png)

