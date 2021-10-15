import fs from 'fs';
import readline from 'readline';

const main = async () => {
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

        console.log('places', places);
        console.log('timesPerDay', timesPerDay);
        console.log('numOfGroups', numOfGroups);
        console.log('groups', groups);
    };

    const output1 = await processFile('1_simple_case.txt');
};

if (require.main === module) {
    main();
}
