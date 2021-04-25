package com.example.servingwebcontent;

/**
 * 4, 50000, 120, 0.95 -> parameters
 */
public class SimulatedAnnealing {
    public static void main(String[] args) {
        System.out.println("Hello, Elly and Steffy");
        SimulatedAnnealing annealing = new SimulatedAnnealing();
        int numberOfIterations = annealing.solve(4, 50000, 120, 0.95);

    }

    public int solve(int n, int maxNumOfIterations, double temperature, double coolingFactor) {
        int[] r = SolverUtils.generateRandomState(n);

        int costToBeat = SolverUtils.getHeuristicCost(r);

        int x = 0;
        // terminate when it reaches max num of iterations or problem is solved.
        for (; x < maxNumOfIterations && costToBeat > 0; x++) {
            r = makeMove(r, costToBeat, temperature);
            costToBeat = SolverUtils.getHeuristicCost(r);
            temperature = Math.max(temperature * coolingFactor, 0.01);
        }
        System.out.println(x);

        return costToBeat == 0 ? x : maxNumOfIterations; // return solution if solved
    }

    private int[] makeMove(int r[], int costToBeat, double temp) {
        int n = r.length;

        while (true) {
            int nCol = (int) (Math.random() * n);
            int nRow = (int) (Math.random() * n);
            int tmpRow = r[nCol];
            r[nCol] = nRow;

            int cost = SolverUtils.getHeuristicCost(r);
            if (cost < costToBeat)
                return r;

            int dE = costToBeat - cost;
            double acceptProb = Math.min(1, Math.exp(dE / temp));

            if (Math.random() < acceptProb)
                return r;

            r[nCol] = tmpRow;
        }


    }

}
