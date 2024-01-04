package pac;

import java.util.Arrays;

public class Chance {
    public static int[] countStudentsAhead(int[] capabilities) {
        int n = capabilities.length;
        int[] result = new int[n]; 

        for (int i = 0; i < n; i++) {
            int count = 0;
            for (int j =0; j < i; j++) {
                if (capabilities[j] > capabilities[i]) {
                    count++;
                }
            }
            result[i] = count;
        }

        return result;
    }

    public static void main(String[] args) {
        int[] capabilities = {4, 9, 5, 3, 2, 10};
        int[] studentsAhead = countStudentsAhead(capabilities);

        System.out.println(Arrays.toString(studentsAhead));
    }
}
