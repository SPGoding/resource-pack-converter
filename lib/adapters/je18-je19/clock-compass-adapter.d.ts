import Adapter from '../adapter';
import { Resource } from '../../utils/utils';
import Logger from '../../utils/logger';
export default class ClockCompassAdapter implements Adapter {
    constructor();
    execute(input: Resource, logger: Logger): Promise<Resource | Resource[]>;
    private handle;
}
