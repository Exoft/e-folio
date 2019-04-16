import { Developer } from './developer.model';

export class EditDeveloperData {
    constructor(public developer: Developer,
                public imageData: FormData) { }
}
