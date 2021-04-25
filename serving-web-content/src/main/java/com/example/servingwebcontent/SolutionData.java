package com.example.servingwebcontent;

import java.util.ArrayList;
import java.util.List;

public class SolutionData {
    private int n;
    private List<Coordinates> coolingFactor;
    private List<Coordinates> temperature;

    public SolutionData(int n){
        this.n = n;
        this.coolingFactor = new ArrayList<>();
        this.temperature = new ArrayList<>();
    }

    public void addCoolingFactorEntry(Coordinates coolingFactorCoordinates) {
        this.coolingFactor.add(coolingFactorCoordinates);
    }

    public void addTempEntry(Coordinates temperatureCoordinates) {
        this.temperature.add(temperatureCoordinates);
    }

    public int getN() {
        return n;
    }

    public List<Coordinates> getCoolingFactor() {
        return coolingFactor;
    }

    public List<Coordinates> getTemperature() {
        return temperature;
    }
}
