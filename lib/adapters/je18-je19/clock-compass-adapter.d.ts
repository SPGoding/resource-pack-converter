import Adapter from '../adapter';
import { Resource } from '../../utils/Resource';
import Logger from '../../utils/logger';
export default class ClockCompassAdapter implements Adapter {
    constructor();
    execute(input: Resource, logger: Logger): Promise<Resource | Resource[]>;
    private handle;
}
