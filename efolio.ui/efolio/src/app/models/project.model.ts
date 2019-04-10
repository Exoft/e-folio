export class Project {
    constructor(
        public id: number,
        public name: string,
        public internalDescription: string,
        public externalDescription: string,
        public photoBase64: string) { }
}
