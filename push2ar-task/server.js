const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
app.use(express.json());
const PORT = 8000; // Can change this to any preferred port

// const tutorial_1_objects = [
//     {"imgUrl": "/images/headphones_bassking.png", "title": "BassKing Studio Headphones", "rating": 4, "price": 213.49, "category": "Headphones"},
//     {"imgUrl": "/images/watch_techtime.png", "title": "TechTime Elegant Watch", "rating": 5, "price": 167.49, "category": "Smartwatch"},
//     {"imgUrl": "/images/headphones_beatflex.png", "title": "BeatFlex WL Headphones", "rating": 4, "price": 209.49, "category": "Headphones"},
//     {"imgUrl": "/images/headphones_clearsound.png", "title": "ClearSound Pro Headphones", "rating": 3, "price": 196.49, "category": "Headphones"},
//     {"imgUrl": "/images/charger_powergo.png", "title": "PowerGo Slim Charger", "rating": 4, "price": 46.5, "category": "Charger"},
//     {"imgUrl": "/images/charger_ultrapower.png", "title": "UltraPower Mini Charger", "rating": 4, "price": 41.5, "category": "Charger"},
//     {"imgUrl": "/images/charger_rapidcharge.png", "title": "RapidCharge Portable Unit", "rating": 2, "price": 25.99, "category": "Charger"},
//     {"imgUrl": "/images/watch_smartpulse.png", "title": "SmartPulse Navi Watch", "rating": 3, "price": 249.99, "category": "Smartwatch"},
//     {"imgUrl": "/images/watch_healthmonitor.png", "title": "HealthMonitor Smartwatch", "rating": 2, "price": 124.95, "category": "Smartwatch"},
//     {"imgUrl": "/images/watch_pulseplus.png", "title": "PulsePlus HR Smartwatch", "rating": 4, "price": 250.99, "category": "Smartwatch"},
//     {"imgUrl": "/images/headphones_echomaster.png", "title": "EchoMaster Pro Headphones", "rating": 5, "price": 165.99, "category": "Headphones"},
//     {"imgUrl": "/images/headphones_noisecanceller.png", "title": "Canceller Elite Headphones", "rating": 2, "price": 166.49, "category": "Headphones"},
//     {"imgUrl": "/images/headphones_soundwave.png", "title": "SoundWave X Headphones", "rating": 5, "price": 58.49, "category": "Headphones"},
//     {"imgUrl": "/images/watch_timetrack.png", "title": "TimeTrack Fitness Watch", "rating": 4, "price": 155.99, "category": "Smartwatch"},
//     {"imgUrl": "/images/charger_chargemate.png", "title": "ChargeMate High-Capacity", "rating": 5, "price": 14.99, "category": "Charger"},
//     {"imgUrl": "/images/charger_energyboost.png", "title": "EnergyBoost Pocket Charger", "rating": 3, "price": 34.5, "category": "Charger"},
//     {"imgUrl": "/images/watch_activelife.png", "title": "ActiveLife Tracker Watch", "rating": 5, "price": 127.99, "category": "Smartwatch"},
//     {"imgUrl": "/images/charger_everlast.png", "title": "EverLast CP Charger", "rating": 5, "price": 63.98, "category": "Charger"}
// ]

// const tutorial_2_objects = [
//     {"imgUrl": "/images/charger_chargemate.png", "title": "ChargeMate High-Capacity", "rating": 5, "price": 21.5, "category": "Charger"},
//     {"imgUrl": "/images/charger_energyboost.png", "title": "EnergyBoost Pocket Charger", "rating": 3, "price": 16.49, "category": "Charger"},
//     {"imgUrl": "/images/charger_ultrapower.png", "title": "UltraPower Mini Charger", "rating": 4, "price": 14.49, "category": "Charger"},
//     {"imgUrl": "/images/headphones_noisecanceller.png", "title": "Canceller Elite Headphones", "rating": 2, "price": 104.99, "category": "Headphones"},
//     {"imgUrl": "/images/watch_techtime.png", "title": "TechTime Elegant Watch", "rating": 5, "price": 236.98, "category": "Smartwatch"},
//     {"imgUrl": "/images/charger_everlast.png", "title": "EverLast CP Charger", "rating": 5, "price": 20.47, "category": "Charger"},
//     {"imgUrl": "/images/headphones_soundwave.png", "title": "SoundWave X Headphones", "rating": 5, "price": 128.95, "category": "Headphones"},
//     {"imgUrl": "/images/watch_smartpulse.png", "title": "SmartPulse Navi Watch", "rating": 3, "price": 217.99, "category": "Smartwatch"},
//     {"imgUrl": "/images/watch_activelife.png", "title": "ActiveLife Tracker Watch", "rating": 5, "price": 218.5, "category": "Smartwatch"},
//     {"imgUrl": "/images/headphones_echomaster.png", "title": "EchoMaster Pro Headphones", "rating": 5, "price": 183.47, "category": "Headphones"},
//     {"imgUrl": "/images/watch_pulseplus.png", "title": "PulsePlus HR Smartwatch", "rating": 4, "price": 151.47, "category": "Smartwatch"},
//     {"imgUrl": "/images/headphones_bassking.png", "title": "BassKing Studio Headphones", "rating": 4, "price": 51.99, "category": "Headphones"},
//     {"imgUrl": "/images/watch_timetrack.png", "title": "TimeTrack Fitness Watch", "rating": 4, "price": 183.49, "category": "Smartwatch"},
//     {"imgUrl": "/images/charger_rapidcharge.png", "title": "RapidCharge Portable Unit", "rating": 2, "price": 6.95, "category": "Charger"},
//     {"imgUrl": "/images/charger_powergo.png", "title": "PowerGo Slim Charger", "rating": 4, "price": 52.5, "category": "Charger"},
//     {"imgUrl": "/images/headphones_beatflex.png", "title": "BeatFlex WL Headphones", "rating": 4, "price": 53.95, "category": "Headphones"},
//     {"imgUrl": "/images/watch_healthmonitor.png", "title": "HealthMonitor Smartwatch", "rating": 2, "price": 189.99, "category": "Smartwatch"},
//     {"imgUrl": "/images/headphones_clearsound.png", "title": "ClearSound Pro Headphones", "rating": 3, "price": 122.47, "category": "Headphones"}
// ]

const tutorial_1_objects = [
    {"imgUrl": "/images/headphones_noisecanceller.png", "title": "Canceller Elite Headphones", "rating": 2, "price": 188.95, "category": "Headphones"},
    {"imgUrl": "/images/charger_rapidboost.png", "title": "RapidBoost Turbo Charger", "rating": 4, "price": 48.99, "category": "Charger"},
    {"imgUrl": "/images/headphones_bassking.png", "title": "BassKing Studio Headphones", "rating": 4, "price": 133.5, "category": "Headphones"},
    {"imgUrl": "/images/watch_sleekstyle.png", "title": "SleekStyle Fashion Watch", "rating": 4, "price": 141.95, "category": "Smartwatch"},
    {"imgUrl": "/images/headphones_studiomax.png", "title": "StudioMax Pro Headphones", "rating": 5, "price": 78.95, "category": "Headphones"},
    {"imgUrl": "/images/charger_ecopower.png", "title": "EcoPower Mi Charger", "rating": 4, "price": 44.5, "category": "Charger"},
    {"imgUrl": "/images/charger_hypercharge.png", "title": "HyperCharge Quick Charger", "rating": 5, "price": 18.99, "category": "Charger"},
    {"imgUrl": "/images/headphones_bassboosterultra.png", "title": "BassBooster Ultra Headphones", "rating": 5, "price": 210.49, "category": "Headphones"},
    {"imgUrl": "/images/watch_techsync.png", "title": "TechSync Sport Watch", "rating": 5, "price": 147.95, "category": "Smartwatch"},
    {"imgUrl": "/images/headphones_noiseshield.png", "title": "NoiseShield NC Headphones", "rating": 5, "price": 82.49, "category": "Headphones"},
    {"imgUrl": "/images/watch_healthmonitor.png", "title": "HealthMonitor Smartwatch", "rating": 2, "price": 164.99, "category": "Smartwatch"},
    {"imgUrl": "/images/charger_powergo.png", "title": "PowerGo Slim Charger", "rating": 4, "price": 25.95, "category": "Charger"},
    {"imgUrl": "/images/watch_skytracker.png", "title": "SkyTracker Fitness Watch", "rating": 4, "price": 126.95, "category": "Smartwatch"},
    {"imgUrl": "/images/charger_energyboost.png", "title": "EnergyBoost Pocket Charger", "rating": 3, "price": 8.99, "category": "Charger"},
    {"imgUrl": "/images/headphones_echomaster.png", "title": "EchoMaster Pro Headphones", "rating": 5, "price": 137.47, "category": "Headphones"},
    {"imgUrl": "/images/headphones_clearsound.png", "title": "ClearSound Pro Headphones", "rating": 3, "price": 201.47, "category": "Headphones"},
    {"imgUrl": "/images/headphones_cleartune.png", "title": "ClearTune RP Headphones", "rating": 4, "price": 182.98, "category": "Headphones"},
    {"imgUrl": "/images/watch_adventurepro.png", "title": "AdventurePro Outdoor Watch", "rating": 4, "price": 265.47, "category": "Smartwatch"},
    {"imgUrl": "/images/charger_everlast.png", "title": "EverLast CP Charger", "rating": 5, "price": 53.5, "category": "Charger"},
    {"imgUrl": "/images/charger_rapidcharge.png", "title": "RapidCharge Portable Unit", "rating": 2, "price": 24.95, "category": "Charger"},
    {"imgUrl": "/images/watch_pulseplus.png", "title": "PulsePlus HR Smartwatch", "rating": 4, "price": 246.98, "category": "Smartwatch"},
    {"imgUrl": "/images/charger_chargemate.png", "title": "ChargeMate High-Capacity", "rating": 5, "price": 45.99, "category": "Charger"},
    {"imgUrl": "/images/charger_speedcharge.png", "title": "SpeedCharge Ultra-Fast Charger", "rating": 4, "price": 36.47, "category": "Charger"},
    {"imgUrl": "/images/charger_quantumcharge.png", "title": "QuantumCharge Fast Charger", "rating": 5, "price": 59.95, "category": "Charger"},
    {"imgUrl": "/images/headphones_quantumsound.png", "title": "Quantum Sound Headphones", "rating": 4, "price": 213.95, "category": "Headphones"},
    {"imgUrl": "/images/watch_urbanfit.png", "title": "UrbanFit LS Watch", "rating": 3, "price": 84.98, "category": "Smartwatch"},
    {"imgUrl": "/images/headphones_beatflex.png", "title": "BeatFlex WL Headphones", "rating": 4, "price": 66.47, "category": "Headphones"},
    {"imgUrl": "/images/headphones_bassjunkiexl.png", "title": "BassJunkie XL Headphones", "rating": 4, "price": 177.99, "category": "Headphones"},
    {"imgUrl": "/images/watch_techtime.png", "title": "TechTime Elegant Watch", "rating": 5, "price": 125.49, "category": "Smartwatch"},
    {"imgUrl": "/images/watch_smartpulse.png", "title": "SmartPulse Navi Watch", "rating": 3, "price": 233.5, "category": "Smartwatch"},
    {"imgUrl": "/images/headphones_soundwave.png", "title": "SoundWave X Headphones", "rating": 5, "price": 80.95, "category": "Headphones"},
    {"imgUrl": "/images/watch_timetrack.png", "title": "TimeTrack Fitness Watch", "rating": 4, "price": 88.5, "category": "Smartwatch"},
    {"imgUrl": "/images/watch_flexfitpro.png", "title": "FlexFit Pro Watch", "rating": 5, "price": 105.49, "category": "Smartwatch"},
    {"imgUrl": "/images/watch_activelife.png", "title": "ActiveLife Tracker Watch", "rating": 5, "price": 210.99, "category": "Smartwatch"},
    {"imgUrl": "/images/charger_powercore.png", "title": "PowerCore High Capacity Charger", "rating": 5, "price": 50.98, "category": "Charger"},
    {"imgUrl": "/images/charger_ultrapower.png", "title": "UltraPower Mini Charger", "rating": 4, "price": 11.5, "category": "Charger"}
]

const tutorial_2_objects = [
    {"imgUrl": "/images/watch_smartpulse.png", "title": "SmartPulse Navi Watch", "rating": 3, "price": 222.99, "category": "Smartwatch"},
    {"imgUrl": "/images/watch_skytracker.png", "title": "SkyTracker Fitness Watch", "rating": 4, "price": 176.5, "category": "Smartwatch"},
    {"imgUrl": "/images/charger_speedcharge.png", "title": "SpeedCharge Ultra-Fast Charger", "rating": 4, "price": 11.95, "category": "Charger"},
    {"imgUrl": "/images/headphones_quantumsound.png", "title": "Quantum Sound Headphones", "rating": 4, "price": 123.49, "category": "Headphones"},
    {"imgUrl": "/images/headphones_bassking.png", "title": "BassKing Studio Headphones", "rating": 4, "price": 191.95, "category": "Headphones"},
    {"imgUrl": "/images/watch_pulseplus.png", "title": "PulsePlus HR Smartwatch", "rating": 4, "price": 90.95, "category": "Smartwatch"},
    {"imgUrl": "/images/charger_powercore.png", "title": "PowerCore High Capacity Charger", "rating": 5, "price": 39.98, "category": "Charger"},
    {"imgUrl": "/images/headphones_bassboosterultra.png", "title": "BassBooster Ultra Headphones", "rating": 5, "price": 200.99, "category": "Headphones"},
    {"imgUrl": "/images/watch_activelife.png", "title": "ActiveLife Tracker Watch", "rating": 5, "price": 177.49, "category": "Smartwatch"},
    {"imgUrl": "/images/watch_timetrack.png", "title": "TimeTrack Fitness Watch", "rating": 4, "price": 105.5, "category": "Smartwatch"},
    {"imgUrl": "/images/charger_quantumcharge.png", "title": "QuantumCharge Fast Charger", "rating": 5, "price": 48.99, "category": "Charger"},
    {"imgUrl": "/images/headphones_cleartune.png", "title": "ClearTune RP Headphones", "rating": 4, "price": 76.47, "category": "Headphones"},
    {"imgUrl": "/images/charger_everlast.png", "title": "EverLast CP Charger", "rating": 5, "price": 22.98, "category": "Charger"},
    {"imgUrl": "/images/headphones_soundwave.png", "title": "SoundWave X Headphones", "rating": 5, "price": 121.99, "category": "Headphones"},
    {"imgUrl": "/images/charger_energyboost.png", "title": "EnergyBoost Pocket Charger", "rating": 3, "price": 39.49, "category": "Charger"},
    {"imgUrl": "/images/watch_healthmonitor.png", "title": "HealthMonitor Smartwatch", "rating": 2, "price": 95.47, "category": "Smartwatch"},
    {"imgUrl": "/images/charger_rapidcharge.png", "title": "RapidCharge Portable Unit", "rating": 2, "price": 56.99, "category": "Charger"},
    {"imgUrl": "/images/charger_powergo.png", "title": "PowerGo Slim Charger", "rating": 4, "price": 11.47, "category": "Charger"},
    {"imgUrl": "/images/charger_hypercharge.png", "title": "HyperCharge Quick Charger", "rating": 5, "price": 32.98, "category": "Charger"},
    {"imgUrl": "/images/watch_techtime.png", "title": "TechTime Elegant Watch", "rating": 5, "price": 218.5, "category": "Smartwatch"},
    {"imgUrl": "/images/watch_techsync.png", "title": "TechSync Sport Watch", "rating": 5, "price": 116.49, "category": "Smartwatch"},
    {"imgUrl": "/images/watch_urbanfit.png", "title": "UrbanFit LS Watch", "rating": 3, "price": 261.98, "category": "Smartwatch"},
    {"imgUrl": "/images/charger_chargemate.png", "title": "ChargeMate High-Capacity", "rating": 5, "price": 38.5, "category": "Charger"},
    {"imgUrl": "/images/charger_ecopower.png", "title": "EcoPower Mi Charger", "rating": 4, "price": 27.49, "category": "Charger"},
    {"imgUrl": "/images/charger_rapidboost.png", "title": "RapidBoost Turbo Charger", "rating": 4, "price": 54.98, "category": "Charger"},
    {"imgUrl": "/images/headphones_clearsound.png", "title": "ClearSound Pro Headphones", "rating": 3, "price": 61.5, "category": "Headphones"},
    {"imgUrl": "/images/headphones_bassjunkiexl.png", "title": "BassJunkie XL Headphones", "rating": 4, "price": 130.5, "category": "Headphones"},
    {"imgUrl": "/images/watch_adventurepro.png", "title": "AdventurePro Outdoor Watch", "rating": 4, "price": 261.47, "category": "Smartwatch"},
    {"imgUrl": "/images/watch_flexfitpro.png", "title": "FlexFit Pro Watch", "rating": 5, "price": 110.95, "category": "Smartwatch"},
    {"imgUrl": "/images/headphones_beatflex.png", "title": "BeatFlex WL Headphones", "rating": 4, "price": 185.99, "category": "Headphones"},
    {"imgUrl": "/images/charger_ultrapower.png", "title": "UltraPower Mini Charger", "rating": 4, "price": 35.5, "category": "Charger"},
    {"imgUrl": "/images/headphones_echomaster.png", "title": "EchoMaster Pro Headphones", "rating": 5, "price": 209.95, "category": "Headphones"},
    {"imgUrl": "/images/watch_sleekstyle.png", "title": "SleekStyle Fashion Watch", "rating": 4, "price": 208.98, "category": "Smartwatch"},
    {"imgUrl": "/images/headphones_noisecanceller.png", "title": "Canceller Elite Headphones", "rating": 2, "price": 104.95, "category": "Headphones"},
    {"imgUrl": "/images/headphones_studiomax.png", "title": "StudioMax Pro Headphones", "rating": 5, "price": 189.99, "category": "Headphones"},
    {"imgUrl": "/images/headphones_noiseshield.png", "title": "NoiseShield NC Headphones", "rating": 5, "price": 140.98, "category": "Headphones"}
]


// const task_1_objects = [
//     {"imgUrl": "/images/groceries/coffee_ducho_gala.png", "title": "Duchissimo<br>Gala No. 1", "rating": 3, "price": 19.99, "category": "Coffee"},
//     {"imgUrl": "/images/groceries/coffee_ducho_crema.png", "title": "Duchissimo<br>Crema", "rating": 3, "price": 6.47, "category": "Coffee"},
//     {"imgUrl": "/images/groceries/coffee_wild_colombia.png", "title": "Wild Coffee<br>Colombia", "rating": 4, "price": 23.47, "category": "Coffee"},
//     {"imgUrl": "/images/groceries/coffee_wild_house.png", "title": "Wild Coffee<br>House Coffee", "rating": 5, "price": 17.49, "category": "Coffee"},
//     {"imgUrl": "/images/groceries/cheese_highlandharvest_emmentaler.png", "title": "Highland<br>Emmentaler", "rating": 3, "price": 29.47, "category": "Cheese"},
//     {"imgUrl": "/images/groceries/cheese_malforma_appenzeller.png", "title": "Malforma<br>Appenzeller", "rating": 4, "price": 26.99, "category": "Cheese"},
//     {"imgUrl": "/images/groceries/coffee_wild_ethiopia.png", "title": "Wild Coffee<br>Ethiopia", "rating": 1, "price": 9.95, "category": "Coffee"},
//     {"imgUrl": "/images/groceries/cheese_cheerfuldairy_brie.png", "title": "Cheerful Dairy<br>Brie", "rating": 5, "price": 29.95, "category": "Cheese"},
//     {"imgUrl": "/images/groceries/wine_argento_merlot.png", "title": "Argento<br>Merlot", "rating": 5, "price": 30.49, "category": "Wine"},
//     {"imgUrl": "/images/groceries/beer_earthsinger_wheat.png", "title": "Earthsinger<br>Wheat Beer", "rating": 4, "price": 8.99, "category": "Beer"},
//     {"imgUrl": "/images/groceries/wine_crystal_riesling.png", "title": "Crystal<br>Riesling", "rating": 3, "price": 57.49, "category": "Wine"},
//     {"imgUrl": "/images/groceries/wine_vermentino_chardonnay.png", "title": "Vermentino<br>Chardonnay", "rating": 2, "price": 35.99, "category": "Wine"},
//     {"imgUrl": "/images/groceries/coffee_tchubi_exclusive.png", "title": "Tchubi<br>Exclusive", "rating": 5, "price": 7.99, "category": "Coffee"},
//     {"imgUrl": "/images/groceries/cheese_happyfarms_brie.png", "title": "Happy Farmers<br>Brie", "rating": 2, "price": 16.49, "category": "Cheese"},
//     {"imgUrl": "/images/groceries/cheese_mountainpeak_gouda.png", "title": "Mountain Peak<br>Gouda", "rating": 5, "price": 26.95, "category": "Cheese"},
//     {"imgUrl": "/images/groceries/cheese_swissdeluxe_appenzeller.png", "title": "Swiss Deluxe<br>Appenzeller", "rating": 1, "price": 23.49, "category": "Cheese"},
//     {"imgUrl": "/images/groceries/wine_tuscan_chianti.png", "title": "Tuscan Sun<br>Chianti", "rating": 4, "price": 11.47, "category": "Wine"},
//     {"imgUrl": "/images/groceries/wine_velvet_pinot.png", "title": "Velvet<br>Pinot", "rating": 1, "price": 57.98, "category": "Wine"},
//     {"imgUrl": "/images/groceries/wine_frescobaldi_riesling.png", "title": "Frescobaldi<br>Riesling", "rating": 5, "price": 51.49, "category": "Wine"},
//     {"imgUrl": "/images/groceries/beer_redhouse_pilsner.png", "title": "Red House<br>Fir Cone Pilsner", "rating": 1, "price": 5.47, "category": "Beer"},
//     {"imgUrl": "/images/groceries/beer_guinny_black.png", "title": "Guinny<br>Black Beer", "rating": 4, "price": 4.5, "category": "Beer"},
//     {"imgUrl": "/images/groceries/wine_tenuta_pinot.png", "title": "Tenuta<br>Pinot", "rating": 3, "price": 15.49, "category": "Wine"},
//     {"imgUrl": "/images/groceries/beer_monarch_wheat.png", "title": "Monarch<br>Wheat Beer", "rating": 5, "price": 9.47, "category": "Beer"},
//     {"imgUrl": "/images/groceries/cheese_cheddar.png", "title": "Happy Farmers<br>Mild Cheddar", "rating": 3, "price": 23.5, "category": "Cheese"},
//     {"imgUrl": "/images/groceries/wine_domaine_cabernet.png", "title": "Domaine<br>Cabernet", "rating": 4, "price": 35.98, "category": "Wine"},
//     {"imgUrl": "/images/groceries/beer_cheesetwister_black.png", "title": "Cheesetwister<br>Black Beer", "rating": 5, "price": 5.98, "category": "Beer"},
//     {"imgUrl": "/images/groceries/coffee_john_blend.png", "title": "Trader John<br>House Blend", "rating": 4, "price": 14.98, "category": "Coffee"},
//     {"imgUrl": "/images/groceries/beer_hopopotamus_haze_ipa.png", "title": "Hopopotamus<br>Haze", "rating": 3, "price": 4.98, "category": "Beer"},
//     {"imgUrl": "/images/groceries/beer_goldenale.png", "title": "Golden Ale<br>Beer", "rating": 4, "price": 9.98, "category": "Beer"},
//     {"imgUrl": "/images/groceries/beer_stormystout.png", "title": "Stormy Stout<br>Beer", "rating": 4, "price": 11.47, "category": "Beer"},
//     {"imgUrl": "/images/groceries/beer_frothy_unicorn_ipa.png", "title": "Frothy Unicorn<br>IPA", "rating": 3, "price": 6.99, "category": "Beer"},
//     {"imgUrl": "/images/groceries/cheese_happyfarms_gouda.png", "title": "Happy Farmers<br>Gouda", "rating": 4, "price": 24.99, "category": "Cheese"},
//     {"imgUrl": "/images/groceries/beer_crownriver_pilsner.png", "title": "Crownriver<br>Pilsner", "rating": 2, "price": 11.95, "category": "Beer"},
//     {"imgUrl": "/images/groceries/coffee_john_colombia.png", "title": "Trader John<br>Colombia", "rating": 2, "price": 6.98, "category": "Coffee"}
// ]

// const task_2_objects = [
//     {"imgUrl": "/images/groceries/cheese_happyfarms_gouda.png", "title": "Happy Farmers<br>Gouda", "rating": 4, "price": 17.49, "category": "Cheese"},
//     {"imgUrl": "/images/groceries/beer_monarch_wheat.png", "title": "Monarch<br>Wheat Beer", "rating": 5, "price": 7.49, "category": "Beer"},
//     {"imgUrl": "/images/groceries/wine_velvet_pinot.png", "title": "Velvet<br>Pinot", "rating": 1, "price": 7.47, "category": "Wine"},
//     {"imgUrl": "/images/groceries/cheese_highlandharvest_emmentaler.png", "title": "Highland<br>Emmentaler", "rating": 3, "price": 24.47, "category": "Cheese"},
//     {"imgUrl": "/images/groceries/cheese_mountainpeak_gouda.png", "title": "Mountain Peak<br>Gouda", "rating": 5, "price": 27.98, "category": "Cheese"},
//     {"imgUrl": "/images/groceries/beer_crownriver_pilsner.png", "title": "Crownriver<br>Pilsner", "rating": 2, "price": 8.47, "category": "Beer"},
//     {"imgUrl": "/images/groceries/coffee_john_blend.png", "title": "Trader John<br>House Blend", "rating": 4, "price": 18.49, "category": "Coffee"},
//     {"imgUrl": "/images/groceries/wine_crystal_riesling.png", "title": "Crystal<br>Riesling", "rating": 3, "price": 40.5, "category": "Wine"},
//     {"imgUrl": "/images/groceries/beer_guinny_black.png", "title": "Guinny<br>Black Beer", "rating": 4, "price": 8.49, "category": "Beer"},
//     {"imgUrl": "/images/groceries/wine_frescobaldi_riesling.png", "title": "Frescobaldi<br>Riesling", "rating": 5, "price": 50.5, "category": "Wine"},
//     {"imgUrl": "/images/groceries/cheese_happyfarms_brie.png", "title": "Happy Farmers<br>Brie", "rating": 2, "price": 26.99, "category": "Cheese"},
//     {"imgUrl": "/images/groceries/beer_stormystout.png", "title": "Stormy Stout<br>Beer", "rating": 4, "price": 3.98, "category": "Beer"},
//     {"imgUrl": "/images/groceries/wine_tenuta_pinot.png", "title": "Tenuta<br>Pinot", "rating": 3, "price": 20.49, "category": "Wine"},
//     {"imgUrl": "/images/groceries/coffee_wild_ethiopia.png", "title": "Wild Coffee<br>Ethiopia", "rating": 1, "price": 18.5, "category": "Coffee"},
//     {"imgUrl": "/images/groceries/beer_earthsinger_wheat.png", "title": "Earthsinger<br>Wheat Beer", "rating": 4, "price": 7.47, "category": "Beer"},
//     {"imgUrl": "/images/groceries/cheese_cheerfuldairy_brie.png", "title": "Cheerful Dairy<br>Brie", "rating": 5, "price": 17.95, "category": "Cheese"},
//     {"imgUrl": "/images/groceries/wine_argento_merlot.png", "title": "Argento<br>Merlot", "rating": 5, "price": 49.5, "category": "Wine"},
//     {"imgUrl": "/images/groceries/beer_hopopotamus_haze_ipa.png", "title": "Hopopotamus<br>Haze", "rating": 3, "price": 5.5, "category": "Beer"},
//     {"imgUrl": "/images/groceries/coffee_wild_colombia.png", "title": "Wild Coffee<br>Colombia", "rating": 4, "price": 21.95, "category": "Coffee"},
//     {"imgUrl": "/images/groceries/cheese_cheddar.png", "title": "Happy Farmers<br>Mild Cheddar", "rating": 3, "price": 22.5, "category": "Cheese"},
//     {"imgUrl": "/images/groceries/beer_cheesetwister_black.png", "title": "Cheesetwister<br>Black Beer", "rating": 5, "price": 7.95, "category": "Beer"},
//     {"imgUrl": "/images/groceries/beer_redhouse_pilsner.png", "title": "Red House<br>Fir Cone Pilsner", "rating": 1, "price": 6.49, "category": "Beer"},
//     {"imgUrl": "/images/groceries/wine_tuscan_chianti.png", "title": "Tuscan Sun<br>Chianti", "rating": 4, "price": 7.98, "category": "Wine"},
//     {"imgUrl": "/images/groceries/cheese_swissdeluxe_appenzeller.png", "title": "Swiss Deluxe<br>Appenzeller", "rating": 1, "price": 16.98, "category": "Cheese"},
//     {"imgUrl": "/images/groceries/wine_domaine_cabernet.png", "title": "Domaine<br>Cabernet", "rating": 4, "price": 21.49, "category": "Wine"},
//     {"imgUrl": "/images/groceries/coffee_ducho_gala.png", "title": "Duchissimo<br>Gala No. 1", "rating": 3, "price": 24.99, "category": "Coffee"},
//     {"imgUrl": "/images/groceries/coffee_wild_house.png", "title": "Wild Coffee<br>House Coffee", "rating": 5, "price": 17.98, "category": "Coffee"},
//     {"imgUrl": "/images/groceries/beer_goldenale.png", "title": "Golden Ale<br>Beer", "rating": 4, "price": 9.49, "category": "Beer"},
//     {"imgUrl": "/images/groceries/beer_frothy_unicorn_ipa.png", "title": "Frothy Unicorn<br>IPA", "rating": 3, "price": 8.99, "category": "Beer"},
//     {"imgUrl": "/images/groceries/wine_vermentino_chardonnay.png", "title": "Vermentino<br>Chardonnay", "rating": 2, "price": 7.49, "category": "Wine"},
//     {"imgUrl": "/images/groceries/coffee_tchubi_exclusive.png", "title": "Tchubi<br>Exclusive", "rating": 5, "price": 16.99, "category": "Coffee"},
//     {"imgUrl": "/images/groceries/coffee_john_colombia.png", "title": "Trader John<br>Colombia", "rating": 2, "price": 9.47, "category": "Coffee"},
//     {"imgUrl": "/images/groceries/cheese_malforma_appenzeller.png", "title": "Malforma<br>Appenzeller", "rating": 4, "price": 28.98, "category": "Cheese"},
//     {"imgUrl": "/images/groceries/coffee_ducho_crema.png", "title": "Duchissimo<br>Crema", "rating": 3, "price": 12.99, "category": "Coffee"}
// ]

// const task_3_objects = [
//     {"imgUrl": "/images/groceries/wine_frescobaldi_riesling.png", "title": "Frescobaldi<br>Riesling", "rating": 5, "price": 45.47, "category": "Wine"},
//     {"imgUrl": "/images/groceries/beer_earthsinger_wheat.png", "title": "Earthsinger<br>Wheat Beer", "rating": 4, "price": 6.95, "category": "Beer"},
//     {"imgUrl": "/images/groceries/wine_domaine_cabernet.png", "title": "Domaine<br>Cabernet", "rating": 4, "price": 29.49, "category": "Wine"},
//     {"imgUrl": "/images/groceries/cheese_cheddar.png", "title": "Happy Farmers<br>Mild Cheddar", "rating": 3, "price": 18.99, "category": "Cheese"},
//     {"imgUrl": "/images/groceries/wine_tuscan_chianti.png", "title": "Tuscan Sun<br>Chianti", "rating": 4, "price": 8.95, "category": "Wine"},
//     {"imgUrl": "/images/groceries/coffee_john_colombia.png", "title": "Trader John<br>Colombia", "rating": 2, "price": 7.95, "category": "Coffee"},
//     {"imgUrl": "/images/groceries/coffee_ducho_gala.png", "title": "Duchissimo<br>Gala No. 1", "rating": 3, "price": 19.95, "category": "Coffee"},
//     {"imgUrl": "/images/groceries/beer_hopopotamus_haze_ipa.png", "title": "Hopopotamus<br>Haze", "rating": 3, "price": 8.47, "category": "Beer"},
//     {"imgUrl": "/images/groceries/beer_frothy_unicorn_ipa.png", "title": "Frothy Unicorn<br>IPA", "rating": 3, "price": 7.99, "category": "Beer"},
//     {"imgUrl": "/images/groceries/coffee_wild_ethiopia.png", "title": "Wild Coffee<br>Ethiopia", "rating": 1, "price": 23.99, "category": "Coffee"},
//     {"imgUrl": "/images/groceries/beer_redhouse_pilsner.png", "title": "Red House<br>Fir Cone Pilsner", "rating": 1, "price": 7.5, "category": "Beer"},
//     {"imgUrl": "/images/groceries/coffee_wild_house.png", "title": "Wild Coffee<br>House Coffee", "rating": 5, "price": 12.99, "category": "Coffee"},
//     {"imgUrl": "/images/groceries/beer_goldenale.png", "title": "Golden Ale<br>Beer", "rating": 4, "price": 5.99, "category": "Beer"},
//     {"imgUrl": "/images/groceries/beer_stormystout.png", "title": "Stormy Stout<br>Beer", "rating": 4, "price": 9.49, "category": "Beer"},
//     {"imgUrl": "/images/groceries/wine_tenuta_pinot.png", "title": "Tenuta<br>Pinot", "rating": 3, "price": 30.98, "category": "Wine"},
//     {"imgUrl": "/images/groceries/cheese_happyfarms_gouda.png", "title": "Happy Farmers<br>Gouda", "rating": 4, "price": 19.99, "category": "Cheese"},
//     {"imgUrl": "/images/groceries/cheese_cheerfuldairy_brie.png", "title": "Cheerful Dairy<br>Brie", "rating": 5, "price": 27.5, "category": "Cheese"},
//     {"imgUrl": "/images/groceries/beer_crownriver_pilsner.png", "title": "Crownriver<br>Pilsner", "rating": 2, "price": 8.99, "category": "Beer"},
//     {"imgUrl": "/images/groceries/beer_cheesetwister_black.png", "title": "Cheesetwister<br>Black Beer", "rating": 5, "price": 8.49, "category": "Beer"},
//     {"imgUrl": "/images/groceries/coffee_wild_colombia.png", "title": "Wild Coffee<br>Colombia", "rating": 4, "price": 21.5, "category": "Coffee"},
//     {"imgUrl": "/images/groceries/wine_vermentino_chardonnay.png", "title": "Vermentino<br>Chardonnay", "rating": 2, "price": 14.99, "category": "Wine"},
//     {"imgUrl": "/images/groceries/cheese_mountainpeak_gouda.png", "title": "Mountain Peak<br>Gouda", "rating": 5, "price": 20.99, "category": "Cheese"},
//     {"imgUrl": "/images/groceries/cheese_malforma_appenzeller.png", "title": "Malforma<br>Appenzeller", "rating": 4, "price": 24.95, "category": "Cheese"},
//     {"imgUrl": "/images/groceries/wine_argento_merlot.png", "title": "Argento<br>Merlot", "rating": 5, "price": 9.5, "category": "Wine"},
//     {"imgUrl": "/images/groceries/coffee_john_blend.png", "title": "Trader John<br>House Blend", "rating": 4, "price": 10.95, "category": "Coffee"},
//     {"imgUrl": "/images/groceries/wine_velvet_pinot.png", "title": "Velvet<br>Pinot", "rating": 1, "price": 53.98, "category": "Wine"},
//     {"imgUrl": "/images/groceries/cheese_swissdeluxe_appenzeller.png", "title": "Swiss Deluxe<br>Appenzeller", "rating": 1, "price": 25.49, "category": "Cheese"},
//     {"imgUrl": "/images/groceries/coffee_tchubi_exclusive.png", "title": "Tchubi<br>Exclusive", "rating": 5, "price": 9.99, "category": "Coffee"},
//     {"imgUrl": "/images/groceries/beer_monarch_wheat.png", "title": "Monarch<br>Wheat Beer", "rating": 5, "price": 3.98, "category": "Beer"},
//     {"imgUrl": "/images/groceries/cheese_highlandharvest_emmentaler.png", "title": "Highland<br>Emmentaler", "rating": 3, "price": 16.95, "category": "Cheese"},
//     {"imgUrl": "/images/groceries/beer_guinny_black.png", "title": "Guinny<br>Black Beer", "rating": 4, "price": 6.99, "category": "Beer"},
//     {"imgUrl": "/images/groceries/wine_crystal_riesling.png", "title": "Crystal<br>Riesling", "rating": 3, "price": 21.99, "category": "Wine"},
//     {"imgUrl": "/images/groceries/coffee_ducho_crema.png", "title": "Duchissimo<br>Crema", "rating": 3, "price": 7.5, "category": "Coffee"},
//     {"imgUrl": "/images/groceries/cheese_happyfarms_brie.png", "title": "Happy Farmers<br>Brie", "rating": 2, "price": 16.49, "category": "Cheese"}
// ]

// const task_4_objects = [
//     {"imgUrl": "/images/groceries/wine_crystal_riesling.png", "title": "Crystal<br>Riesling", "rating": 3, "price": 21.49, "category": "Wine"},
//     {"imgUrl": "/images/groceries/cheese_cheddar.png", "title": "Happy Farmers<br>Mild Cheddar", "rating": 3, "price": 25.47, "category": "Cheese"},
//     {"imgUrl": "/images/groceries/beer_hopopotamus_haze_ipa.png", "title": "Hopopotamus<br>Haze", "rating": 3, "price": 5.5, "category": "Beer"},
//     {"imgUrl": "/images/groceries/beer_crownriver_pilsner.png", "title": "Crownriver<br>Pilsner", "rating": 2, "price": 5.47, "category": "Beer"},
//     {"imgUrl": "/images/groceries/cheese_cheerfuldairy_brie.png", "title": "Cheerful Dairy<br>Brie", "rating": 5, "price": 27.47, "category": "Cheese"},
//     {"imgUrl": "/images/groceries/beer_frothy_unicorn_ipa.png", "title": "Frothy Unicorn<br>IPA", "rating": 3, "price": 4.99, "category": "Beer"},
//     {"imgUrl": "/images/groceries/coffee_wild_house.png", "title": "Wild Coffee<br>House Coffee", "rating": 5, "price": 19.99, "category": "Coffee"},
//     {"imgUrl": "/images/groceries/wine_frescobaldi_riesling.png", "title": "Frescobaldi<br>Riesling", "rating": 5, "price": 45.49, "category": "Wine"},
//     {"imgUrl": "/images/groceries/wine_argento_merlot.png", "title": "Argento<br>Merlot", "rating": 5, "price": 39.95, "category": "Wine"},
//     {"imgUrl": "/images/groceries/cheese_mountainpeak_gouda.png", "title": "Mountain Peak<br>Gouda", "rating": 5, "price": 17.47, "category": "Cheese"},
//     {"imgUrl": "/images/groceries/cheese_swissdeluxe_appenzeller.png", "title": "Swiss Deluxe<br>Appenzeller", "rating": 1, "price": 18.47, "category": "Cheese"},
//     {"imgUrl": "/images/groceries/cheese_happyfarms_gouda.png", "title": "Happy Farmers<br>Gouda", "rating": 4, "price": 28.47, "category": "Cheese"},
//     {"imgUrl": "/images/groceries/beer_stormystout.png", "title": "Stormy Stout<br>Beer", "rating": 4, "price": 6.95, "category": "Beer"},
//     {"imgUrl": "/images/groceries/cheese_happyfarms_brie.png", "title": "Happy Farmers<br>Brie", "rating": 2, "price": 20.99, "category": "Cheese"},
//     {"imgUrl": "/images/groceries/wine_tenuta_pinot.png", "title": "Tenuta<br>Pinot", "rating": 3, "price": 44.99, "category": "Wine"},
//     {"imgUrl": "/images/groceries/coffee_ducho_gala.png", "title": "Duchissimo<br>Gala No. 1", "rating": 3, "price": 17.95, "category": "Coffee"},
//     {"imgUrl": "/images/groceries/beer_guinny_black.png", "title": "Guinny<br>Black Beer", "rating": 4, "price": 5.99, "category": "Beer"},
//     {"imgUrl": "/images/groceries/wine_domaine_cabernet.png", "title": "Domaine<br>Cabernet", "rating": 4, "price": 22.49, "category": "Wine"},
//     {"imgUrl": "/images/groceries/cheese_malforma_appenzeller.png", "title": "Malforma<br>Appenzeller", "rating": 4, "price": 19.47, "category": "Cheese"},
//     {"imgUrl": "/images/groceries/coffee_wild_colombia.png", "title": "Wild Coffee<br>Colombia", "rating": 4, "price": 23.99, "category": "Coffee"},
//     {"imgUrl": "/images/groceries/wine_vermentino_chardonnay.png", "title": "Vermentino<br>Chardonnay", "rating": 2, "price": 34.99, "category": "Wine"},
//     {"imgUrl": "/images/groceries/wine_tuscan_chianti.png", "title": "Tuscan Sun<br>Chianti", "rating": 4, "price": 36.98, "category": "Wine"},
//     {"imgUrl": "/images/groceries/coffee_wild_ethiopia.png", "title": "Wild Coffee<br>Ethiopia", "rating": 1, "price": 10.47, "category": "Coffee"},
//     {"imgUrl": "/images/groceries/coffee_john_blend.png", "title": "Trader John<br>House Blend", "rating": 4, "price": 19.47, "category": "Coffee"},
//     {"imgUrl": "/images/groceries/coffee_tchubi_exclusive.png", "title": "Tchubi<br>Exclusive", "rating": 5, "price": 20.95, "category": "Coffee"},
//     {"imgUrl": "/images/groceries/beer_cheesetwister_black.png", "title": "Cheesetwister<br>Black Beer", "rating": 5, "price": 4.47, "category": "Beer"},
//     {"imgUrl": "/images/groceries/beer_goldenale.png", "title": "Golden Ale<br>Beer", "rating": 4, "price": 4.98, "category": "Beer"},
//     {"imgUrl": "/images/groceries/coffee_john_colombia.png", "title": "Trader John<br>Colombia", "rating": 2, "price": 19.98, "category": "Coffee"},
//     {"imgUrl": "/images/groceries/beer_redhouse_pilsner.png", "title": "Red House<br>Fir Cone Pilsner", "rating": 1, "price": 8.5, "category": "Beer"},
//     {"imgUrl": "/images/groceries/wine_velvet_pinot.png", "title": "Velvet<br>Pinot", "rating": 1, "price": 26.99, "category": "Wine"},
//     {"imgUrl": "/images/groceries/coffee_ducho_crema.png", "title": "Duchissimo<br>Crema", "rating": 3, "price": 5.5, "category": "Coffee"},
//     {"imgUrl": "/images/groceries/beer_monarch_wheat.png", "title": "Monarch<br>Wheat Beer", "rating": 5, "price": 5.95, "category": "Beer"},
//     {"imgUrl": "/images/groceries/beer_earthsinger_wheat.png", "title": "Earthsinger<br>Wheat Beer", "rating": 4, "price": 7.47, "category": "Beer"},
//     {"imgUrl": "/images/groceries/cheese_highlandharvest_emmentaler.png", "title": "Highland<br>Emmentaler", "rating": 3, "price": 24.98, "category": "Cheese"}
// ]


const task_1_objects = [
    {"imgUrl": "/images/groceries/wine_vermentino_chardonnay.png", "title": "Vermentino<br>Chardonnay", "rating": 5, "price": 27.98, "category": "Wine"},
    {"imgUrl": "/images/groceries/beer_hopopotamus_haze_ipa.png", "title": "Hopopotamus<br>Haze", "rating": 3, "price": 12.49, "category": "Beer"},
    {"imgUrl": "/images/groceries/wine_argento_merlot.png", "title": "Argento<br>Merlot", "rating": 3, "price": 27.99, "category": "Wine"},
    {"imgUrl": "/images/groceries/wine_crystalvineyard_grenache.png", "title": "Crystal<br>Grenache", "rating": 4, "price": 17.5, "category": "Wine"},
    {"imgUrl": "/images/groceries/beer_stormystout.png", "title": "Stormy Stout<br>Beer", "rating": 4, "price": 10.95, "category": "Beer"},
    {"imgUrl": "/images/groceries/coffee_ducho_crema.png", "title": "Duchissimo<br>Crema", "rating": 4, "price": 7.47, "category": "Coffee"},
    {"imgUrl": "/images/groceries/wine_tuscan_chianti.png", "title": "Tuscan Sun<br>Chianti", "rating": 1, "price": 32.47, "category": "Wine"},
    {"imgUrl": "/images/groceries/coffee_john_blend.png", "title": "Trader John<br>House Blend", "rating": 1, "price": 16.98, "category": "Coffee"},
    {"imgUrl": "/images/groceries/wine_frescobaldi_riesling.png", "title": "Frescobaldi<br>Riesling", "rating": 3, "price": 25.47, "category": "Wine"},
    {"imgUrl": "/images/groceries/coffee_peak_espresso.png", "title": "Peak<br>Espresso", "rating": 5, "price": 16.95, "category": "Coffee"},
    {"imgUrl": "/images/groceries/beer_redhouse_pilsner.png", "title": "Red House<br>Fir Cone Pilsner", "rating": 1, "price": 12.95, "category": "Beer"},
    {"imgUrl": "/images/groceries/beer_monarch_wheat.png", "title": "Monarch<br>Wheat Beer", "rating": 5, "price": 5.95, "category": "Beer"},
    {"imgUrl": "/images/groceries/coffee_wild_house.png", "title": "Wild Coffee<br>House Coffee", "rating": 2, "price": 23.98, "category": "Coffee"},
    {"imgUrl": "/images/groceries/beer_guinny_black.png", "title": "Guinny<br>Black Beer", "rating": 4, "price": 7.5, "category": "Beer"},
    {"imgUrl": "/images/groceries/beer_earthsinger_wheat.png", "title": "Earthsinger<br>Wheat Beer", "rating": 4, "price": 7.99, "category": "Beer"},
    {"imgUrl": "/images/groceries/beer_crownriver_pilsner.png", "title": "Crownriver<br>Pilsner", "rating": 2, "price": 13.49, "category": "Beer"},
    {"imgUrl": "/images/groceries/wine_velvet_pinot.png", "title": "Velvet<br>Pinot", "rating": 2, "price": 15.98, "category": "Wine"},
    {"imgUrl": "/images/groceries/coffee_tchubi_exclusive.png", "title": "Tchubi<br>Exclusive", "rating": 3, "price": 23.47, "category": "Coffee"},
    {"imgUrl": "/images/groceries/wine_vineyard_blend.png", "title": "Vineyard<br>Special Blend", "rating": 4, "price": 8.47, "category": "Wine"},
    {"imgUrl": "/images/groceries/coffee_ducho_gala.png", "title": "Duchissimo<br>Gala No. 1", "rating": 5, "price": 21.5, "category": "Coffee"},
    {"imgUrl": "/images/groceries/wine_domaine_cabernet.png", "title": "Domaine<br>Cabernet", "rating": 2, "price": 25.95, "category": "Wine"},
    {"imgUrl": "/images/groceries/wine_tenuta_pinot.png", "title": "Tenuta<br>Pinot", "rating": 4, "price": 11.98, "category": "Wine"},
    {"imgUrl": "/images/groceries/coffee_wild_colombia.png", "title": "Wild Coffee<br>Colombia", "rating": 4, "price": 24.47, "category": "Coffee"},
    {"imgUrl": "/images/groceries/beer_brewmasters_belgianale.png", "title": "Brewmaster<br>Belgian Ale", "rating": 5, "price": 5.5, "category": "Beer"},
    {"imgUrl": "/images/groceries/wine_crystal_riesling.png", "title": "Crystal<br>Riesling", "rating": 5, "price": 11.99, "category": "Wine"},
    {"imgUrl": "/images/groceries/wine_oakaged_sauvignon.png", "title": "Oak-Aged<br>Sauvignon", "rating": 5, "price": 24.95, "category": "Wine"},
    {"imgUrl": "/images/groceries/coffee_wild_ethiopia.png", "title": "Wild Coffee<br>Ethiopia", "rating": 3, "price": 18.47, "category": "Coffee"},
    {"imgUrl": "/images/groceries/coffee_john_colombia.png", "title": "Trader John<br>Colombia", "rating": 5, "price": 21.47, "category": "Coffee"},
    {"imgUrl": "/images/groceries/coffee_morningdew_kenyaa.png", "title": "Morning Dew<br>Kenya AA", "rating": 4, "price": 10.47, "category": "Coffee"},
    {"imgUrl": "/images/groceries/beer_goldenale.png", "title": "Golden Ale<br>Beer", "rating": 4, "price": 14.98, "category": "Beer"},
    {"imgUrl": "/images/groceries/beer_frothy_unicorn_ipa.png", "title": "Frothy Unicorn<br>IPA", "rating": 3, "price": 11.99, "category": "Beer"},
    {"imgUrl": "/images/groceries/wine_orchardhills_malbec.png", "title": "Orchard Hills<br>Malbec", "rating": 5, "price": 33.49, "category": "Wine"},
    {"imgUrl": "/images/groceries/beer_monarch_pilsner.png", "title": "Monarch<br>Pilsner", "rating": 3, "price": 11.95, "category": "Beer"},
    {"imgUrl": "/images/groceries/coffee_highlandhaze_guatemalan.png", "title": "Highland Haze<br>Guatemalan", "rating": 5, "price": 18.5, "category": "Coffee"},
    {"imgUrl": "/images/groceries/beer_cheesetwister_black.png", "title": "Cheesetwister<br>Black Beer", "rating": 5, "price": 10.5, "category": "Beer"},
    {"imgUrl": "/images/groceries/coffee_morning_dew.png", "title": "Morning Dew<br>Light Roast", "rating": 2, "price": 19.47, "category": "Coffee"}
]

const task_2_objects = [
    {"imgUrl": "/images/groceries/beer_redhouse_pilsner.png", "title": "Red House<br>Fir Cone Pilsner", "rating": 1, "price": 10.98, "category": "Beer"},
    {"imgUrl": "/images/groceries/beer_crownriver_pilsner.png", "title": "Crownriver<br>Pilsner", "rating": 2, "price": 5.99, "category": "Beer"},
    {"imgUrl": "/images/groceries/wine_argento_merlot.png", "title": "Argento<br>Merlot", "rating": 3, "price": 30.5, "category": "Wine"},
    {"imgUrl": "/images/groceries/beer_brewmasters_belgianale.png", "title": "Brewmaster<br>Belgian Ale", "rating": 5, "price": 13.49, "category": "Beer"},
    {"imgUrl": "/images/groceries/coffee_tchubi_exclusive.png", "title": "Tchubi<br>Exclusive", "rating": 3, "price": 20.47, "category": "Coffee"},
    {"imgUrl": "/images/groceries/wine_tuscan_chianti.png", "title": "Tuscan Sun<br>Chianti", "rating": 1, "price": 16.49, "category": "Wine"},
    {"imgUrl": "/images/groceries/coffee_ducho_crema.png", "title": "Duchissimo<br>Crema", "rating": 4, "price": 15.49, "category": "Coffee"},
    {"imgUrl": "/images/groceries/wine_tenuta_pinot.png", "title": "Tenuta<br>Pinot", "rating": 4, "price": 25.95, "category": "Wine"},
    {"imgUrl": "/images/groceries/beer_stormystout.png", "title": "Stormy Stout<br>Beer", "rating": 4, "price": 12.49, "category": "Beer"},
    {"imgUrl": "/images/groceries/wine_crystal_riesling.png", "title": "Crystal<br>Riesling", "rating": 5, "price": 19.47, "category": "Wine"},
    {"imgUrl": "/images/groceries/wine_velvet_pinot.png", "title": "Velvet<br>Pinot", "rating": 2, "price": 24.49, "category": "Wine"},
    {"imgUrl": "/images/groceries/wine_frescobaldi_riesling.png", "title": "Frescobaldi<br>Riesling", "rating": 3, "price": 26.98, "category": "Wine"},
    {"imgUrl": "/images/groceries/coffee_peak_espresso.png", "title": "Peak<br>Espresso", "rating": 5, "price": 21.98, "category": "Coffee"},
    {"imgUrl": "/images/groceries/wine_crystalvineyard_grenache.png", "title": "Crystal<br>Grenache", "rating": 4, "price": 15.98, "category": "Wine"},
    {"imgUrl": "/images/groceries/coffee_ducho_gala.png", "title": "Duchissimo<br>Gala No. 1", "rating": 5, "price": 14.49, "category": "Coffee"},
    {"imgUrl": "/images/groceries/coffee_wild_house.png", "title": "Wild Coffee<br>House Coffee", "rating": 2, "price": 10.95, "category": "Coffee"},
    {"imgUrl": "/images/groceries/wine_domaine_cabernet.png", "title": "Domaine<br>Cabernet", "rating": 2, "price": 21.98, "category": "Wine"},
    {"imgUrl": "/images/groceries/beer_earthsinger_wheat.png", "title": "Earthsinger<br>Wheat Beer", "rating": 4, "price": 7.47, "category": "Beer"},
    {"imgUrl": "/images/groceries/coffee_morning_dew.png", "title": "Morning Dew<br>Light Roast", "rating": 2, "price": 21.49, "category": "Coffee"},
    {"imgUrl": "/images/groceries/beer_monarch_pilsner.png", "title": "Monarch<br>Pilsner", "rating": 3, "price": 14.49, "category": "Beer"},
    {"imgUrl": "/images/groceries/beer_monarch_wheat.png", "title": "Monarch<br>Wheat Beer", "rating": 5, "price": 8.49, "category": "Beer"},
    {"imgUrl": "/images/groceries/beer_goldenale.png", "title": "Golden Ale<br>Beer", "rating": 4, "price": 8.47, "category": "Beer"},
    {"imgUrl": "/images/groceries/coffee_highlandhaze_guatemalan.png", "title": "Highland Haze<br>Guatemalan", "rating": 5, "price": 21.5, "category": "Coffee"},
    {"imgUrl": "/images/groceries/beer_hopopotamus_haze_ipa.png", "title": "Hopopotamus<br>Haze", "rating": 3, "price": 12.98, "category": "Beer"},
    {"imgUrl": "/images/groceries/coffee_john_blend.png", "title": "Trader John<br>House Blend", "rating": 1, "price": 18.95, "category": "Coffee"},
    {"imgUrl": "/images/groceries/coffee_morningdew_kenyaa.png", "title": "Morning Dew<br>Kenya AA", "rating": 4, "price": 24.47, "category": "Coffee"},
    {"imgUrl": "/images/groceries/wine_oakaged_sauvignon.png", "title": "Oak-Aged<br>Sauvignon", "rating": 5, "price": 17.47, "category": "Wine"},
    {"imgUrl": "/images/groceries/wine_vermentino_chardonnay.png", "title": "Vermentino<br>Chardonnay", "rating": 5, "price": 21.95, "category": "Wine"},
    {"imgUrl": "/images/groceries/beer_cheesetwister_black.png", "title": "Cheesetwister<br>Black Beer", "rating": 5, "price": 11.49, "category": "Beer"},
    {"imgUrl": "/images/groceries/beer_guinny_black.png", "title": "Guinny<br>Black Beer", "rating": 4, "price": 9.47, "category": "Beer"},
    {"imgUrl": "/images/groceries/coffee_wild_colombia.png", "title": "Wild Coffee<br>Colombia", "rating": 4, "price": 6.49, "category": "Coffee"},
    {"imgUrl": "/images/groceries/wine_orchardhills_malbec.png", "title": "Orchard Hills<br>Malbec", "rating": 5, "price": 32.95, "category": "Wine"},
    {"imgUrl": "/images/groceries/coffee_wild_ethiopia.png", "title": "Wild Coffee<br>Ethiopia", "rating": 3, "price": 7.47, "category": "Coffee"},
    {"imgUrl": "/images/groceries/coffee_john_colombia.png", "title": "Trader John<br>Colombia", "rating": 5, "price": 8.49, "category": "Coffee"},
    {"imgUrl": "/images/groceries/wine_vineyard_blend.png", "title": "Vineyard<br>Special Blend", "rating": 4, "price": 33.98, "category": "Wine"},
    {"imgUrl": "/images/groceries/beer_frothy_unicorn_ipa.png", "title": "Frothy Unicorn<br>IPA", "rating": 3, "price": 5.49, "category": "Beer"}
]

const task_3_objects = [
    {"imgUrl": "/images/groceries/wine_crystal_riesling.png", "title": "Crystal<br>Riesling", "rating": 5, "price": 21.95, "category": "Wine"},
    {"imgUrl": "/images/groceries/wine_orchardhills_malbec.png", "title": "Orchard Hills<br>Malbec", "rating": 5, "price": 17.5, "category": "Wine"},
    {"imgUrl": "/images/groceries/coffee_wild_ethiopia.png", "title": "Wild Coffee<br>Ethiopia", "rating": 3, "price": 12.99, "category": "Coffee"},
    {"imgUrl": "/images/groceries/beer_hopopotamus_haze_ipa.png", "title": "Hopopotamus<br>Haze", "rating": 3, "price": 13.5, "category": "Beer"},
    {"imgUrl": "/images/groceries/beer_earthsinger_wheat.png", "title": "Earthsinger<br>Wheat Beer", "rating": 4, "price": 12.47, "category": "Beer"},
    {"imgUrl": "/images/groceries/coffee_morning_dew.png", "title": "Morning Dew<br>Light Roast", "rating": 2, "price": 14.47, "category": "Coffee"},
    {"imgUrl": "/images/groceries/coffee_john_colombia.png", "title": "Trader John<br>Colombia", "rating": 5, "price": 16.95, "category": "Coffee"},
    {"imgUrl": "/images/groceries/wine_oakaged_sauvignon.png", "title": "Oak-Aged<br>Sauvignon", "rating": 5, "price": 25.47, "category": "Wine"},
    {"imgUrl": "/images/groceries/wine_tenuta_pinot.png", "title": "Tenuta<br>Pinot", "rating": 4, "price": 13.99, "category": "Wine"},
    {"imgUrl": "/images/groceries/coffee_highlandhaze_guatemalan.png", "title": "Highland Haze<br>Guatemalan", "rating": 5, "price": 11.47, "category": "Coffee"},
    {"imgUrl": "/images/groceries/wine_domaine_cabernet.png", "title": "Domaine<br>Cabernet", "rating": 2, "price": 33.47, "category": "Wine"},
    {"imgUrl": "/images/groceries/coffee_wild_house.png", "title": "Wild Coffee<br>House Coffee", "rating": 2, "price": 17.5, "category": "Coffee"},
    {"imgUrl": "/images/groceries/beer_brewmasters_belgianale.png", "title": "Brewmaster<br>Belgian Ale", "rating": 5, "price": 10.5, "category": "Beer"},
    {"imgUrl": "/images/groceries/beer_goldenale.png", "title": "Golden Ale<br>Beer", "rating": 4, "price": 5.98, "category": "Beer"},
    {"imgUrl": "/images/groceries/wine_frescobaldi_riesling.png", "title": "Frescobaldi<br>Riesling", "rating": 3, "price": 25.95, "category": "Wine"},
    {"imgUrl": "/images/groceries/beer_monarch_pilsner.png", "title": "Monarch<br>Pilsner", "rating": 3, "price": 7.95, "category": "Beer"},
    {"imgUrl": "/images/groceries/coffee_john_blend.png", "title": "Trader John<br>House Blend", "rating": 1, "price": 6.49, "category": "Coffee"},
    {"imgUrl": "/images/groceries/beer_monarch_wheat.png", "title": "Monarch<br>Wheat Beer", "rating": 5, "price": 12.5, "category": "Beer"},
    {"imgUrl": "/images/groceries/coffee_ducho_gala.png", "title": "Duchissimo<br>Gala No. 1", "rating": 5, "price": 13.99, "category": "Coffee"},
    {"imgUrl": "/images/groceries/wine_vermentino_chardonnay.png", "title": "Vermentino<br>Chardonnay", "rating": 5, "price": 14.47, "category": "Wine"},
    {"imgUrl": "/images/groceries/coffee_morningdew_kenyaa.png", "title": "Morning Dew<br>Kenya AA", "rating": 4, "price": 7.49, "category": "Coffee"},
    {"imgUrl": "/images/groceries/coffee_tchubi_exclusive.png", "title": "Tchubi<br>Exclusive", "rating": 3, "price": 21.47, "category": "Coffee"},
    {"imgUrl": "/images/groceries/coffee_wild_colombia.png", "title": "Wild Coffee<br>Colombia", "rating": 4, "price": 10.99, "category": "Coffee"},
    {"imgUrl": "/images/groceries/wine_tuscan_chianti.png", "title": "Tuscan Sun<br>Chianti", "rating": 1, "price": 26.98, "category": "Wine"},
    {"imgUrl": "/images/groceries/beer_guinny_black.png", "title": "Guinny<br>Black Beer", "rating": 4, "price": 8.98, "category": "Beer"},
    {"imgUrl": "/images/groceries/beer_crownriver_pilsner.png", "title": "Crownriver<br>Pilsner", "rating": 2, "price": 6.5, "category": "Beer"},
    {"imgUrl": "/images/groceries/wine_velvet_pinot.png", "title": "Velvet<br>Pinot", "rating": 2, "price": 17.95, "category": "Wine"},
    {"imgUrl": "/images/groceries/beer_frothy_unicorn_ipa.png", "title": "Frothy Unicorn<br>IPA", "rating": 3, "price": 8.47, "category": "Beer"},
    {"imgUrl": "/images/groceries/coffee_peak_espresso.png", "title": "Peak<br>Espresso", "rating": 5, "price": 21.95, "category": "Coffee"},
    {"imgUrl": "/images/groceries/beer_stormystout.png", "title": "Stormy Stout<br>Beer", "rating": 4, "price": 13.99, "category": "Beer"},
    {"imgUrl": "/images/groceries/beer_redhouse_pilsner.png", "title": "Red House<br>Fir Cone Pilsner", "rating": 1, "price": 12.98, "category": "Beer"},
    {"imgUrl": "/images/groceries/wine_crystalvineyard_grenache.png", "title": "Crystal<br>Grenache", "rating": 4, "price": 22.99, "category": "Wine"},
    {"imgUrl": "/images/groceries/beer_cheesetwister_black.png", "title": "Cheesetwister<br>Black Beer", "rating": 5, "price": 11.95, "category": "Beer"},
    {"imgUrl": "/images/groceries/wine_vineyard_blend.png", "title": "Vineyard<br>Special Blend", "rating": 4, "price": 29.99, "category": "Wine"},
    {"imgUrl": "/images/groceries/wine_argento_merlot.png", "title": "Argento<br>Merlot", "rating": 3, "price": 10.95, "category": "Wine"},
    {"imgUrl": "/images/groceries/coffee_ducho_crema.png", "title": "Duchissimo<br>Crema", "rating": 4, "price": 22.47, "category": "Coffee"}
]

const task_4_objects = [
    {"imgUrl": "/images/groceries/wine_orchardhills_malbec.png", "title": "Orchard Hills<br>Malbec", "rating": 5, "price": 15.5, "category": "Wine"},
    {"imgUrl": "/images/groceries/wine_vineyard_blend.png", "title": "Vineyard<br>Special Blend", "rating": 4, "price": 30.47, "category": "Wine"},
    {"imgUrl": "/images/groceries/coffee_morningdew_kenyaa.png", "title": "Morning Dew<br>Kenya AA", "rating": 4, "price": 14.47, "category": "Coffee"},
    {"imgUrl": "/images/groceries/beer_crownriver_pilsner.png", "title": "Crownriver<br>Pilsner", "rating": 2, "price": 7.49, "category": "Beer"},
    {"imgUrl": "/images/groceries/wine_crystalvineyard_grenache.png", "title": "Crystal<br>Grenache", "rating": 4, "price": 30.98, "category": "Wine"},
    {"imgUrl": "/images/groceries/wine_oakaged_sauvignon.png", "title": "Oak-Aged<br>Sauvignon", "rating": 5, "price": 32.98, "category": "Wine"},
    {"imgUrl": "/images/groceries/beer_cheesetwister_black.png", "title": "Cheesetwister<br>Black Beer", "rating": 5, "price": 8.95, "category": "Beer"},
    {"imgUrl": "/images/groceries/coffee_ducho_gala.png", "title": "Duchissimo<br>Gala No. 1", "rating": 5, "price": 20.99, "category": "Coffee"},
    {"imgUrl": "/images/groceries/beer_goldenale.png", "title": "Golden Ale<br>Beer", "rating": 4, "price": 13.47, "category": "Beer"},
    {"imgUrl": "/images/groceries/coffee_peak_espresso.png", "title": "Peak<br>Espresso", "rating": 5, "price": 11.99, "category": "Coffee"},
    {"imgUrl": "/images/groceries/wine_frescobaldi_riesling.png", "title": "Frescobaldi<br>Riesling", "rating": 3, "price": 16.99, "category": "Wine"},
    {"imgUrl": "/images/groceries/beer_redhouse_pilsner.png", "title": "Red House<br>Fir Cone Pilsner", "rating": 1, "price": 10.99, "category": "Beer"},
    {"imgUrl": "/images/groceries/wine_domaine_cabernet.png", "title": "Domaine<br>Cabernet", "rating": 2, "price": 24.47, "category": "Wine"},
    {"imgUrl": "/images/groceries/beer_brewmasters_belgianale.png", "title": "Brewmaster<br>Belgian Ale", "rating": 5, "price": 6.5, "category": "Beer"},
    {"imgUrl": "/images/groceries/beer_hopopotamus_haze_ipa.png", "title": "Hopopotamus<br>Haze", "rating": 3, "price": 8.47, "category": "Beer"},
    {"imgUrl": "/images/groceries/coffee_morning_dew.png", "title": "Morning Dew<br>Light Roast", "rating": 2, "price": 9.99, "category": "Coffee"},
    {"imgUrl": "/images/groceries/coffee_highlandhaze_guatemalan.png", "title": "Highland Haze<br>Guatemalan", "rating": 5, "price": 7.47, "category": "Coffee"},
    {"imgUrl": "/images/groceries/coffee_ducho_crema.png", "title": "Duchissimo<br>Crema", "rating": 4, "price": 17.99, "category": "Coffee"},
    {"imgUrl": "/images/groceries/coffee_wild_house.png", "title": "Wild Coffee<br>House Coffee", "rating": 2, "price": 21.99, "category": "Coffee"},
    {"imgUrl": "/images/groceries/wine_tuscan_chianti.png", "title": "Tuscan Sun<br>Chianti", "rating": 1, "price": 19.5, "category": "Wine"},
    {"imgUrl": "/images/groceries/coffee_wild_colombia.png", "title": "Wild Coffee<br>Colombia", "rating": 4, "price": 13.98, "category": "Coffee"},
    {"imgUrl": "/images/groceries/wine_argento_merlot.png", "title": "Argento<br>Merlot", "rating": 3, "price": 8.5, "category": "Wine"},
    {"imgUrl": "/images/groceries/coffee_tchubi_exclusive.png", "title": "Tchubi<br>Exclusive", "rating": 3, "price": 12.5, "category": "Coffee"},
    {"imgUrl": "/images/groceries/beer_monarch_pilsner.png", "title": "Monarch<br>Pilsner", "rating": 3, "price": 11.49, "category": "Beer"},
    {"imgUrl": "/images/groceries/beer_frothy_unicorn_ipa.png", "title": "Frothy Unicorn<br>IPA", "rating": 3, "price": 5.98, "category": "Beer"},
    {"imgUrl": "/images/groceries/wine_tenuta_pinot.png", "title": "Tenuta<br>Pinot", "rating": 4, "price": 22.5, "category": "Wine"},
    {"imgUrl": "/images/groceries/wine_vermentino_chardonnay.png", "title": "Vermentino<br>Chardonnay", "rating": 5, "price": 8.95, "category": "Wine"},
    {"imgUrl": "/images/groceries/wine_velvet_pinot.png", "title": "Velvet<br>Pinot", "rating": 2, "price": 14.49, "category": "Wine"},
    {"imgUrl": "/images/groceries/beer_stormystout.png", "title": "Stormy Stout<br>Beer", "rating": 4, "price": 12.49, "category": "Beer"},
    {"imgUrl": "/images/groceries/coffee_john_blend.png", "title": "Trader John<br>House Blend", "rating": 1, "price": 18.99, "category": "Coffee"},
    {"imgUrl": "/images/groceries/beer_monarch_wheat.png", "title": "Monarch<br>Wheat Beer", "rating": 5, "price": 9.99, "category": "Beer"},
    {"imgUrl": "/images/groceries/coffee_wild_ethiopia.png", "title": "Wild Coffee<br>Ethiopia", "rating": 3, "price": 6.5, "category": "Coffee"},
    {"imgUrl": "/images/groceries/beer_earthsinger_wheat.png", "title": "Earthsinger<br>Wheat Beer", "rating": 4, "price": 9.5, "category": "Beer"},
    {"imgUrl": "/images/groceries/beer_guinny_black.png", "title": "Guinny<br>Black Beer", "rating": 4, "price": 6.47, "category": "Beer"},
    {"imgUrl": "/images/groceries/coffee_john_colombia.png", "title": "Trader John<br>Colombia", "rating": 5, "price": 22.95, "category": "Coffee"},
    {"imgUrl": "/images/groceries/wine_crystal_riesling.png", "title": "Crystal<br>Riesling", "rating": 5, "price": 31.95, "category": "Wine"}
]

const studyStages = {
    'tutorial1': tutorial_1_objects,
    'tutorial2': tutorial_2_objects,
    'task1': task_1_objects,
    'task2': task_2_objects,
    'task3': task_3_objects,
    'task4': task_4_objects,
};


const sequences = [
    ['tutorial1', 'tutorial2', 'task1', 'task2', 'task3', 'task4'],
    ['tutorial1', 'tutorial2', 'task1', 'task2', 'task3', 'task4'],
    ['tutorial2', 'tutorial1', 'task2', 'task4', 'task1', 'task3'],
    ['tutorial2', 'tutorial1', 'task2', 'task4', 'task1', 'task3'],
    ['tutorial1', 'tutorial2', 'task4', 'task3', 'task2', 'task1'],
    ['tutorial1', 'tutorial2', 'task4', 'task3', 'task2', 'task1'],
    ['tutorial2', 'tutorial1', 'task3', 'task1', 'task4', 'task2'],
    ['tutorial2', 'tutorial1', 'task3', 'task1', 'task4', 'task2']
]

// Serve static files
app.use(express.static('public'));
app.use('/icons', express.static(__dirname + '/node_modules/bootstrap-icons'));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
app.get('/tutorial-description', (req, res) => {
    const { participantId, stage, condition } = req.query;
    res.redirect(`/tutorial-description.html?participantId=${participantId}&condition=${condition}&stage=${stage}`);
    // writeLog(participantId, stage, condition, "Opened tutorial description");
});

app.get('/task-description', (req, res) => {
    const { participantId, stage, condition } = req.query;
    res.redirect(`/task-description.html?participantId=${participantId}&condition=${condition}&stage=${stage}`);
    // writeLog(participantId, stage, condition, "Opened task description");
});

app.get('/tutorial', (req, res) => {
    const { participantId, stage, condition } = req.query;
    res.redirect(`/tutorial.html?participantId=${participantId}&condition=${condition}&stage=${stage}`);
    // writeLog(participantId, stage, condition, "Opened tutorial");
});


app.get('/task', (req, res) => {
    // This needs to be expanded based on how you're identifying which task to serve
    const { participantId, stage, condition } = req.query;
    res.redirect(`/task.html?participantId=${participantId}&condition=${condition}&stage=${stage}`);
    // writeLog(participantId, stage, condition, "Opened task");
});

// API endpoint to get products based on the participant's condition and stage
app.get('/api/products', (req, res) => {
    const { participantId, stage, condition } = req.query;
    // Select the correct product array based on condition and task
    const products = studyStages[stage];

    if (products) {
        res.json(products);
        writeLog(participantId, stage, condition, "Loaded prducts");
    } else {
        res.status(404).send('Products not found');
        writeLog(participantId, stage, condition, "Error loading products");
    }
});



app.post('/api/advance-state', (req, res) => {
    const { participantId, stage, condition } = req.query;
    // Get current sequence from sequences based on participantId
    const stages = sequences[(participantId - 1) % sequences.length];
    let currentStageIndex = stages.findIndex(s => s === stage);

    if (currentStageIndex === -1) {
        return res.status(400).send('Invalid current stage');
    }

    const nextStageIndex = currentStageIndex + 1;

    if (nextStageIndex < stages.length) {
        const nextStage = stages[nextStageIndex];
        // Always switch condition when advancing stages
        const newCondition = condition === 'control' ? 'push2AR' : 'control';
        res.json({ nextStage: nextStage, condition: newCondition });
    } else {
        // If there's no next stage, indicate completion or the end of the sequence
        res.json({ nextStage: null, condition: condition });
    }
});




// Dynamic route for product pages
app.get('/product', (req, res) => {
    const { participantId, stage, condition } = req.query;
    const title = req.query.title;

    // Select the correct product array based on condition and task
    const products = studyStages[stage];
    const product = products.find(p => p.title === title);

    if (!product) {
        return res.status(404).send('Product not found');
    }

    // Construct absolute URL for the image
    const imageUrl = `http://192.168.0.205:8000${product.imgUrl}`;

    // Generate HTML content dynamically with OpenGraph meta tags
    const productPageHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta property="og:title" content="${product.title}">
            <meta property="og:description" content="${product.category}\nRating: ${product.rating}\nPrice: \$${product.price}">
            <meta property="og:image" content="${imageUrl}">
            <title>${product.title}</title>
        </head>
        <body>
            <h1>${product.title}</h1>
            <img src="${product.imgUrl}" alt="${product.title}">
            <p>Rating: ${product.rating}</p>
            <p>Price: ${product.price}</p>
            <a href="/">Back to products</a>
        </body>
        </html>
    `;
    res.send(productPageHTML);
});


// New code: Setting up an object to hold write streams for logs
const logStreams = {};

function getLogStream(filename) {
    // Check if the stream already exists, if not, create it
    if (!logStreams[filename]) {
        // Create a write stream in append mode
        logStreams[filename] = fs.createWriteStream(filename, { flags: 'a' });
        // Handle stream events if needed, such as 'error'
        logStreams[filename].on('error', (err) => {
            console.error(`Error writing to log file ${filename}: ${err}`);
        });
    }
    return logStreams[filename];
}

function writeLog(participantId, state, condition, messageObject) {
    // Format participantId to always have at least two digits
    const formattedParticipantId = participantId.padStart(2, '0');
    // Updated filename to use formattedParticipantId
    const filename = `logs/${formattedParticipantId}_${condition}_${state}.jsonl`; // Changed the file extension to .jsonl for JSON Lines format

    const logEntry = {
        timestamp: new Date().toISOString(),
        participantId,
        state,
        condition,
        message: messageObject  // Now expecting an object instead of a string
    };

    const logStream = getLogStream(filename);
    logStream.write(JSON.stringify(logEntry) + '\n'); // Write the log entry as a new line in the file
}

// Modify the /api/log endpoint as necessary
app.post('/api/log', (req, res) => {
    const { participantId, state, condition, message } = req.body;

    // Call the updated function to write the log
    writeLog(participantId, state, condition, message);

    res.json({ status: 'success', message: 'Log recorded' });
});


// Ensure streams are properly closed when the server is shutting down
function closeAllLogStreams() {
    for (let key in logStreams) {
        if (logStreams[key].open) {
            logStreams[key].stream.end();
            logStreams[key].open = false;
        }
    }
}

process.on('SIGINT', () => {
    closeAllLogStreams();
    process.exit();
});

// Listen for requests
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://${'0.0.0.0'}:${PORT}`);
});

