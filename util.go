package main

import "strconv"

func mapToInt(arr []string) []int {
	var result = []int{}

	for _, it := range arr {

		val, err := strconv.Atoi(it)
		if err != nil {
			panic(err)
		}

		result = append(result, val)
	}

	return result
}
