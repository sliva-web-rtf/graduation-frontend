import { StateSchema } from 'app/providers/StoreProvider';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import axios, { AxiosStatic } from 'axios';

type ActionCreatorType<Return, Arg, RejectedValue>
    = (arg: Arg) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>;

jest.mock('axios');

const mockedAxios = jest.mocked(axios, true);

export class TestAsyncThunk<Return, Arg, RejectedValue> {
    private dispatch: jest.MockedFn<any>;

    private getState: () => StateSchema;

    private actionCreator: ActionCreatorType<Return, Arg, RejectedValue>;

    private http: jest.MockedFunctionDeep<AxiosStatic>;

    private navigate: jest.MockedFn<any>;

    public constructor(
        actionCreator: ActionCreatorType<Return, Arg, RejectedValue>,
        state?: DeepPartial<StateSchema>,
    ) {
        this.actionCreator = actionCreator;
        this.dispatch = jest.fn();
        this.getState = jest.fn(() => state as StateSchema);

        this.http = mockedAxios;
        this.navigate = jest.fn();
    }

    public async callThunk(arg: Arg) {
        const action = this.actionCreator(arg);
        const result = await action(
            this.dispatch,
            this.getState,
            { navigate: this.navigate },
        );

        return result;
    }
}
