import { Section } from "./section.model";

export class Chair {
    constructor(
      public id: number,
      public name: String,
      public section: Section
    ) { }
}