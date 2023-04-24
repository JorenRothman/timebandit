#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs';

import listEntries from '@/commands/list';
import exportEntries from '@/commands/export';
import trackTime from '@/commands/track';
import { CONFIG_DIR } from '@/constants/paths';
import { VERSION } from '@/constants/package-info';
import reset from '@/commands/reset';
import { DB } from './constants/database';

DB.create();

const program = new Command();

if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR);
}

program
    .name('timebandit')
    .version(VERSION)
    .description(
        'A time tracking CLI tool, “Stealing” your time back, one command at a time!'
    );

program
    .command('track')
    .description('Starts a new time entry')
    .argument('<project>', 'Project name')
    .argument(
        '[description]',
        'Description of the time entry',
        'No description'
    )
    .action(trackTime);

program
    .command('list')
    .description('Lists all time entries')
    .action(listEntries);

program
    .command('export')
    .description('Exports all time entries to a csv file')
    .argument('<path>', 'Path to export to')
    .action(exportEntries);

program.command('reset').description('Resets the database').action(reset);

program.parse();
