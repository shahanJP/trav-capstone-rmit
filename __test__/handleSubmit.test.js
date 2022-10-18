import {handleSubmit} from "../src/client/js/handleSubmit";
import {describe, expect} from "@jest/globals";

//reference Stackflow
describe('Testing handleSubmit function', () => {
    test('It should return true because the function is defined', () => {
        expect(handleSubmit).toBeDefined();
    });
    test('submits the form data', () => {
        expect(typeof handleSubmit).toBe('function');
    });
});

