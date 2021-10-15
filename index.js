"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const calculateEarnings = (places, timesPerDay, groups) => {
        return new Promise((resolve) => {
            // sequences array to store past sequences and their earnings
            const sequences = new Map();
            let earnings = 0;
            let groupCount = groups.shift();
            // do/while since the attraction can only function for a limited number of times per day.
            do {
                // Build current sequence
                const currentSequence = `${groupCount},${groups.toString()}`;
                // Look for similar past sequence
                const pastSequence = sequences.get(currentSequence);
                // If we already had a similar sequence, then we only need to add its earnings to the total earnings
                if (pastSequence) {
                    // Add to earnings
                    earnings += pastSequence;
                    groups.push(groupCount);
                    // As soon as the ride is finished, the groups that come out, go back into the queue in the same order.
                    groupCount = groups.shift();
                }
                else {
                    // Otherwise, calculate earnings
                    let numOfPersons = 0;
                    // People queue up in front of the attraction
                    // They can either be alone or in a group. When groups are in the queue, they necessarily want to ride together, without being separated.
                    // People never overtake each other in the queue.
                    // When there isn’t enough space in the attraction for the next group in the queue, the ride starts (so it is not always full).
                    for (let i = 0; i <= groups.length && numOfPersons + groupCount <= places; i++) {
                        numOfPersons += groupCount;
                        groups.push(groupCount);
                        // As soon as the ride is finished, the groups that come out, go back into the queue in the same order.
                        groupCount = groups.shift();
                    }
                    // Store new sequence
                    sequences.set(currentSequence, numOfPersons);
                    // Add to total earnings
                    earnings += numOfPersons;
                }
                // Decrease remaining times per day
                timesPerDay--;
            } while (timesPerDay > 0);
            resolve(earnings);
        });
    };
    const processFile = (fileName) => __awaiter(void 0, void 0, void 0, function* () {
        var e_1, _a;
        // The attraction contains a limited number `L` of places.
        let places = 0;
        // The attraction can only function `C` number of times per day.
        let timesPerDay = 0;
        // The queue contains a number `N` of groups.
        let numOfGroups = 0;
        // Each group contains a number `Pi` of people.
        const groups = [];
        const fileStream = fs_1.default.createReadStream(`./samples/${fileName}`);
        const rl = readline_1.default.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });
        let index = 0;
        try {
            for (var rl_1 = __asyncValues(rl), rl_1_1; rl_1_1 = yield rl_1.next(), !rl_1_1.done;) {
                const line = rl_1_1.value;
                if (index === 0) {
                    const splitLine = line.split(' ');
                    places = parseInt(splitLine[0]);
                    timesPerDay = parseInt(splitLine[1]);
                    numOfGroups = parseInt(splitLine[2]);
                }
                else {
                    groups.push(parseInt(line));
                }
                index++;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (rl_1_1 && !rl_1_1.done && (_a = rl_1.return)) yield _a.call(rl_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return yield calculateEarnings(places, timesPerDay, groups);
    });
    // const output1 = await processFile('1_simple_case.txt');
    // console.log(`1_simple_case.txt => ${output1} dirhams`);
    // const output2 = await processFile('2_1000_groups_of_few_people.txt');
    // console.log(`2_1000_groups_of_few_people.txt => ${output2} dirhams`);
    // const output3 = await processFile('3_the_same_groups_go_on_the_ride_several_times_during_the_day.txt');
    // console.log(`3_the_same_groups_go_on_the_ride_several_times_during_the_day.txt => ${output3} dirhams`);
    // const output4 = await processFile('4_all_the_people_get_on_the_roller_coaster_at_least_once.txt');
    // console.log(`4_all_the_people_get_on_the_roller_coaster_at_least_once.txt => ${output4} dirhams`);
    // const output5 = await processFile('5_high_earnings_during_the_day.txt');
    // console.log(`5_high_earnings_during_the_day.txt => ${output5} dirhams`);
    const output6 = yield processFile('6_works_with_a_large_dataset.txt');
    console.log(`6_works_with_a_large_dataset.txt => ${output6} dirhams`);
    // const output7 = await processFile('7_hard.txt');
    // console.log(`7_hard.txt => ${output7} dirhams`);
    // const output8 = await processFile('8_harder.txt');
    // console.log(`8_harder.txt => ${output8} dirhams`);
});
if (require.main === module) {
    main();
}
