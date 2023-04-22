#!/usr/bin/env node

import { Command } from 'commander';
import { differenceInMilliseconds, format } from 'date-fns';
import sqlite3 from 'sqlite3';
import os from 'os';
import path from 'path';
import fs from 'fs';
import { config } from 'process';

sqlite3.verbose();

const program = new Command();

const keypress = async () => {
    process.stdin.setRawMode(true);
    return new Promise((resolve) =>
        process.stdin.once('data', () => {
            process.stdin.setRawMode(false);
            resolve(true);
        })
    );
};

const configDir = path.resolve(os.homedir(), '.timebandit');

if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir);
}

program
    .name('Time Bandit')
    .version('0.0.1')
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
    .action(async (project, description) => {
        const db = new sqlite3.Database(
            path.resolve(configDir, 'database.sqlite3')
        );

        console.log(
            `Starting a new time entry for ${project} with description ${description}`
        );

        const startTime = new Date();

        console.log('Press any key to stop the time entry');
        await keypress();

        const endTime = new Date();

        const duration = differenceInMilliseconds(endTime, startTime);

        // format duration date to HH:MM:SS
        const hours = Math.floor(duration / 1000 / 60 / 60);
        const minutes = Math.floor((duration / 1000 / 60 / 60 - hours) * 60);
        const seconds = Math.floor(
            ((duration / 1000 / 60 / 60 - hours) * 60 - minutes) * 60
        );

        const formattedTime = format(
            new Date(0, 0, 0, hours, minutes, seconds),
            'HH:mm:ss'
        );

        db.serialize(() => {
            db.prepare(
                `CREATE TABLE IF NOT EXISTS times (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    project TEXT NOT NULL,
                    description TEXT NOT NULL,
                    start_time TEXT NOT NULL,
                    end_time TEXT NOT NULL,
                    duration INTEGER NOT NULL
                )`
            ).run();

            db.prepare('INSERT INTO times VALUES (?, ?, ?, ?, ?, ?)')
                .run(
                    null,
                    project,
                    description,
                    startTime.toISOString(),
                    endTime.toISOString(),
                    formattedTime
                )
                .finalize(function () {
                    process.exit();
                });
        });

        console.log(`Tracked: ${formattedTime} For ${project}`);
    });

program
    .command('list')
    .description('Lists all time entries')
    .action(() => {
        const db = new sqlite3.Database(
            path.resolve(configDir, 'database.sqlite3')
        );

        db.serialize(() => {
            db.all('SELECT * FROM times', (err, rows: any) => {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }

                rows.forEach((row: any) => {
                    console.log(
                        `${row.id} - ${row.project} - ${row.description} - ${row.start_time} - ${row.end_time} - ${row.duration}`
                    );
                });
            });
        });
    });

program
    .command('export')
    .description('Exports all time entries to a csv file')
    .argument('<path>', 'Path to export to')
    .action((pathName) => {
        const db = new sqlite3.Database(
            path.resolve(configDir, 'database.sqlite3')
        );

        db.serialize(() => {
            db.all('SELECT * FROM times', (err, rows: any) => {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }

                const headers =
                    'id,project,description,start_time,end_time,duration';

                const csv = rows
                    .map((row: any) => {
                        return `${row.id},${row.project},${row.description},${row.start_time},${row.end_time},${row.duration}`;
                    })
                    .join(os.EOL);

                const csvWithHeaders = `${headers}${os.EOL}${csv}`;

                fs.writeFileSync(
                    path.resolve(pathName, 'export.csv'),
                    csvWithHeaders,
                    'utf8'
                );
            });
        });
    });

program.parse();
