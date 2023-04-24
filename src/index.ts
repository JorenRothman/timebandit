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
import backup from './commands/backup';
import importBackup from './commands/import';

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

program
    .command('backup')
    .description('Backs up the database')
    .argument('[path]', 'Path to backup to')
    .action(backup);

program
    .command('import')
    .description('Imports a backup')
    .argument('<path>', 'Path to import from')
    .action(importBackup);

program.command('reset').description('Resets the database').action(reset);

program.parse();
