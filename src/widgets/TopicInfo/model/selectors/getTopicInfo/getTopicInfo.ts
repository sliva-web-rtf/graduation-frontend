import { StateSchema } from '@/app/providers/StoreProvider';
import { initialState } from '../../slice/topicInfoSlice';

export const getTopicInfo = (state: StateSchema) => state['topic-info'] || initialState;
