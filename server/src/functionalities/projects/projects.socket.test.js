import { beforeEach, describe, expect, test, vi } from 'vitest'
import useSupabase from '../../globalFuntionalities/myLibraries/useSupabase.js';
import projects from "./projects.js";
import Utils from '../../globalFuntionalities/utils';

const mockSelect = vi.fn();
const mockUpdate = vi.fn();
const mockInsert = vi.fn(() => {
    this.rsp = {
        success: true, data: "empty"
    }
    return 'select';
});

vi.mock("../../globalFuntionalities/myLibraries/useSupabase.js", () => {


    const useSupabase = vi.fn(function (name) {
        this.name = name;
        this.rsp = "default";
        this.setRsp = (obj) => {
            this.rsp = obj;
        }
        this.countSelect = 0;

        this.update = mockUpdate;
        this.select = mockSelect
        this.insert = mockInsert;

        this.select.bind(this);
        this.update.bind(this);

    });

    return {
        default: useSupabase,
    };
});

const params = {
    data: true, projectid: 1, profileid: 2, ws: {
        send: vi.fn()
    }
}

const database = new useSupabase();

function sum(a, b) {
    return a + b;
}
let count = 0;

describe(" For - saveProject2", () => {


    count = 1;

    mockSelect.mockImplementation(function (...args) {
        if (count === 1) {
            this.rsp = {
                success: true, data: true
            };
        } else if (count === 2) {
            this.rsp = {
                success: true, data: true
            };
        }

        count += 1;
    })
    mockUpdate.mockImplementation(function (...args) {
        this.rsp = {
            success: true, data: true
        };
    })

    test("When all database request succesfull , the paramters are all provided, ", async () => {


        await projects.saveProject2(params.data, params.projectid, params.profileid, params.ws);
        expect(mockSelect.mock.calls).toHaveLength(2);
        expect(mockSelect.mock.calls[0]).toEqual(['projects', "projectid", { filterName: 'eq', column: "projectid", value: parseInt(params.projectid) }])
        expect(mockSelect.mock.calls[1]).toEqual(['projects', "projectid", { filterName: 'eq', column: "profileid", value: parseInt(params.profileid) }])
        expect(params.ws.send.mock.calls[0][0]).toEqual(JSON.stringify([1, 'Seems the data must be updated to the project at project id : ' + params.projectid]))

    })




    describe("When paramters not provided", () => {


        test("profile id not provided, ", async () => {

            params.ws.send.mockClear();
            await projects.saveProject2(params.data, null, params.profileid, params.ws);

            expect(params.ws.send.mock.calls[0][0]).toEqual(JSON.stringify(Utils.responseJsonTemplate(1, [-1, 'clientError:  Parameter error while checking varaible = projectid, not found  '])));

        })

        test("data not provided ", async () => {

            params.ws.send.mockClear();
            await projects.saveProject2(null, params.projectid, params.profileid, params.ws);
            expect(params.ws.send.mock.calls[0][0]).toEqual(JSON.stringify(Utils.responseJsonTemplate(1, [-1, "clientError:  Parameter error while checking varaible = data, not found  "])));

        })
    })

    describe('When error from database', () => {




        test("when update fails", async () => {

            count = 1;

            mockUpdate.mockImplementation(function (...args) {
                this.rsp = {
                    success: false, data: true, error: 'error at scope'
                };
            })

            params.ws.send.mockClear();
            await projects.saveProject2(params.data, params.projectid, params.profileid, params.ws);
            expect(params.ws.send.mock.calls[0][0]).toEqual(JSON.stringify(Utils.responseJsonTemplate(1, [-2, "supabaseError: Error white inserting the data to project, for projectid 1 : error at scope"])))
        })




        test("when select project fails", async () => {
            count = 1;
            mockSelect.mockImplementation(function (...args) {
                if (count === 1) {
                    this.rsp = {
                        success: false, data: true
                    };
                } else if (count === 2) {
                    this.rsp = {
                        success: true, data: true
                    };
                }

                count += 1;
            })
            mockUpdate.mockImplementation(function (...args) {
                this.rsp = {
                    success: true, data: true, error: 'error at scope'
                };
            })

            params.ws.send.mockClear();
            await projects.saveProject2(params.data, params.projectid, params.profileid, params.ws);
            expect(params.ws.send.mock.calls[0][0]).toEqual(JSON.stringify(Utils.responseJsonTemplate(1, [-2, "supabaseError: Error while fetching the project from the server :"])))
        })

        test("when select project by profile id fails", async () => {
            count = 1;
            mockSelect.mockImplementation(function (...args) {
                if (count === 1) {
                    this.rsp = {
                        success: true, data: true
                    };
                } else if (count === 2) {
                    this.rsp = {
                        success: false, data: true, error: 'error at scope'
                    };
                }

                count += 1;
            })
            mockUpdate.mockImplementation(function (...args) {
                this.rsp = {
                    success: true, data: true, error: 'error at scope'
                };
            })

            params.ws.send.mockClear();
            await projects.saveProject2(params.data, params.projectid, params.profileid, params.ws);
            expect(params.ws.send.mock.calls[0][0]).toEqual(JSON.stringify(Utils.responseJsonTemplate(1, [-2, "supabaseError: Error white fetching profileid about the project, with projectid - 1, error : error at scope"])))
        })

    })

})

