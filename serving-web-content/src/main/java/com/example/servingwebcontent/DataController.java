package com.example.servingwebcontent;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class DataController {
    private static double DEFAULT_INITIAL_TEMPERATURE = 120;
    private static double DEFAULT_COOLING_FACTOR = 120;
    private static int AVERAGE_NUMBER_OF_CALLING_THE_ALGORITHM = 10;
    private static int MAX_NUMBER_OF_ITERATION = 500000;
    private static  SimulatedAnnealing annealing = new SimulatedAnnealing();

    private static double solveWithAveragingTheResult(
            int numberOfRepetitions,
            int n,
            int maxNumOfIterations,
            double temperature,
            double coolingFactor
    ) {
        double numberOfIterationsToSolveTheProblemTotalSum = 0;

        for (int i = 0; i < numberOfRepetitions; i++) {
            // 4, 50000, 120, 0.95 <- default values of the annealing algorithm
            int resultFromTheSolution = annealing.solve(n,maxNumOfIterations,temperature,coolingFactor);
            numberOfIterationsToSolveTheProblemTotalSum += resultFromTheSolution;
        }

        double averageNumberOfIterationsToSolveTheProblem = numberOfIterationsToSolveTheProblemTotalSum / numberOfRepetitions;
        return averageNumberOfIterationsToSolveTheProblem;
    }

    @GetMapping("/data")
    public List<SolutionData> getTestData(@RequestParam Map<String,String> allParams) {

        int queensCountFrom = Integer.parseInt(allParams.get("queensCountFrom")) ;
        int queensCountTo = Integer.parseInt(allParams.get("queensCountTo")) ;

        double tempFrom = Double.parseDouble(allParams.get("tempFrom")) ;
        double tempTo = Double.parseDouble(allParams.get("tempTo")) ;
        double tempStep = Double.parseDouble(allParams.get("tempStep")) ;

        double coolingFactorFrom = Double.parseDouble(allParams.get("coolingFactorFrom")) ;
        double coolingFactorTo = Double.parseDouble(allParams.get("coolingFactorTo")) ;
        double coolingFactorStep = Double.parseDouble(allParams.get("coolingFactorStep")) ;


        List<SolutionData> solutionDataList = new ArrayList<>();

        for (int n = queensCountFrom; n <= queensCountTo; n++) {
            SolutionData solutionData = new SolutionData(n);
            for (double currentTemp = tempFrom; currentTemp <= tempTo; currentTemp+=tempStep) {
                double averageNumberOfIterationToSolve = solveWithAveragingTheResult(
                        AVERAGE_NUMBER_OF_CALLING_THE_ALGORITHM,
                        n,
                        MAX_NUMBER_OF_ITERATION,
                        currentTemp,
                        DEFAULT_COOLING_FACTOR
                );
                solutionData.addTempEntry(new Coordinates(currentTemp, averageNumberOfIterationToSolve));
            }

            double currentCoolingFact = coolingFactorFrom;
            for (; currentCoolingFact <= coolingFactorTo; currentCoolingFact += coolingFactorStep) {
                double averageNumberOfIterationToSolve = solveWithAveragingTheResult(
                        AVERAGE_NUMBER_OF_CALLING_THE_ALGORITHM,
                        n,
                        MAX_NUMBER_OF_ITERATION,
                        DEFAULT_INITIAL_TEMPERATURE,
                        currentCoolingFact
                );
                solutionData.addCoolingFactorEntry(
                        new Coordinates(currentCoolingFact, averageNumberOfIterationToSolve)
                );
            }

            solutionDataList.add(solutionData);
        }

        return solutionDataList;
    }
}
