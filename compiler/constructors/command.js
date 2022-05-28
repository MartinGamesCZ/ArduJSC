class Command {
    constructor(name, description, aliases, usage, execute) {
        this.name = name;
        this.description = description;
        this.aliases = aliases;
        this.usage = usage;
        this.execute = execute;
    }
}

module.exports = Command;