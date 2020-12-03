package main

import (
	"fmt"
	"io/ioutil"
	"regexp"
	"strings"
)

const (
	today = 2
)

func main() {
	// Read todays file
	dat, err := ioutil.ReadFile(fmt.Sprintf("%02d.in", today))
	if err != nil {
		panic(err)
	}

	// Split lines, and parse as int
	lines := strings.Split(string(dat), "\n")

	var result1, result2 int

	for _, line := range lines {
		elements := strings.Split(line, " ")

		// parse rule
		var ruleRange []int = mapToInt(strings.Split(elements[0], "-"))
		var ruleChar string = elements[1][0:1]

		// search for occurance of ruleChar
		matches := regexp.MustCompile(ruleChar).FindAllStringIndex(elements[2], -1)

		// compare with Part 1 rule
		if len(matches) >= ruleRange[0] && len(matches) <= ruleRange[1] {
			result1++
		}

		// compare with Part 2 rule
		var matchesRule bool
		for _, match := range matches {
			// As FindAllString() is providing start and end of the match,
			// we could compare to match[1] instead of match[0]+1 as we are looking for a single char anyway
			if match[0]+1 == ruleRange[0] || match[0]+1 == ruleRange[1] {
				matchesRule = !matchesRule
			}
		}
		// Exactly one appearance
		if matchesRule {
			result2++
		}
	}

	fmt.Printf("Part 1: %d\n", result1)
	fmt.Printf("Part 2: %d\n", result2)
}
