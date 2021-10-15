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
        console.log('places', places);
        console.log('timesPerDay', timesPerDay);
        console.log('numOfGroups', numOfGroups);
        console.log('groups', groups);
    });
    const output1 = yield processFile('1_simple_case.txt');
});
if (require.main === module) {
    main();
}
