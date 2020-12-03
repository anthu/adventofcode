package main

import (
	"fmt"
	"io/ioutil"
	"strings"
)

const (
	today  = 1
	target = 2020
)

func main() {
	// Read todays file
	dat, err := ioutil.ReadFile(fmt.Sprintf("%02d.in", today))
	if err != nil {
		panic(err)
	}

	// Split lines, and parse as int
	var intLines = mapToInt(strings.Split(string(dat), "\n"))

	for i, line := range intLines {
		for j := i + 1; j < len(intLines); j++ {

			// Search for Part 1 duplet
			if line+intLines[j] == target {
				fmt.Printf("Part1 %d\n", line*intLines[j])
			}

			// Search for Part 2 triplet
			for k := j + 1; k < len(intLines); k++ {
				if line+intLines[j]+intLines[k] == target {
					fmt.Printf("Part2 %d\n", line*intLines[j]*intLines[k])
				}
			}
		}
	}
}
