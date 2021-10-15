import fs from 'fs';
import readline from 'readline';

const main = async () => {
    const calculateEarnings = (places: number, timesPerDay: number, groups: number[]) => {
        return new Promise((resolve) => {
            let earnings = 0;
            let groupCount = groups.shift()!;

            // do/while since the attraction can only function for a limited number of times per day.
            do {
                let numOfPersons = 0;

                // People queue up in front of the attraction
                // They can either be alone or in a group. When groups are in the queue, they necessarily want to ride together, without being separated.
                // People never overtake each other in the queue.
                // When there isn’t enough space in the attraction for the next group in the queue, the ride starts (so it is not always full).
                for (let i = 0; i < groups.length && numOfPersons + groupCount <= places; i++) {
                    numOfPersons += groupCount;

                    groups.push(groupCount);

                    // * As soon as the ride is finished, the groups that come out, go back into the queue in the same order.
                    groupCount = groups.shift()!;
                }

                // Add to earnings
                earnings += numOfPersons;

                // Decrease remaining times per day
                timesPerDay--;
            } while (timesPerDay > 0);

            resolve(earnings);
        });
    };

    const processFile = async (fileName: string) => {
        // The attraction contains a limited number `L` of places.
        let places = 0;
        // The attraction can only function `C` number of times per day.
        let timesPerDay = 0;
        // The queue contains a number `N` of groups.
        let numOfGroups = 0;
        // Each group contains a number `Pi` of people.
        const groups: number[] = [];

        const fileStream = fs.createReadStream(`./samples/${fileName}`);

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });

        let index = 0;
        for await (const line of rl) {
            if (index === 0) {
                const splitLine = line.split(' ');
                places = parseInt(splitLine[0]);
                timesPerDay = parseInt(splitLine[1]);
                numOfGroups = parseInt(splitLine[2]);
            } else {
                groups.push(parseInt(line));
            }

            index++;
        }

        return await calculateEarnings(places, timesPerDay, groups);
    };

    const output1 = await processFile('1_simple_case.txt');
    console.log(`1_simple_case.txt => ${output1} dirhams`);

    const output2 = await processFile('2_1000_groups_of_few_people.txt');
    console.log(`2_1000_groups_of_few_people.txt => ${output2} dirhams`);

    const output3 = await processFile('3_the_same_groups_go_on_the_ride_several_times_during_the_day.txt');
    console.log(`3_the_same_groups_go_on_the_ride_several_times_during_the_day.txt => ${output3} dirhams`);

    const output4 = await processFile('4_all_the_people_get_on_the_roller_coaster_at_least_once.txt');
    console.log(`4_all_the_people_get_on_the_roller_coaster_at_least_once.txt => ${output4} dirhams`);

    const output5 = await processFile('5_high_earnings_during_the_day.txt');
    console.log(`5_high_earnings_during_the_day.txt => ${output5} dirhams`);

    // const output6 = await processFile('6_works_with_a_large_dataset.txt');
    // console.log(`6_works_with_a_large_dataset.txt => ${output6} dirhams`);

    // const output7 = await processFile('7_hard.txt');
    // console.log(`7_hard.txt => ${output7} dirhams`);

    // const output8 = await processFile('8_harder.txt');
    // console.log(`8_harder.txt => ${output8} dirhams`);
};

if (require.main === module) {
    main();
}
