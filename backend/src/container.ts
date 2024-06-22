import 'reflect-metadata';
import { container } from 'tsyringe';
import ITorrentSearchService from './torrentSearch/contracts/ITorrentSearchService.js';
import TorrentSearchService from './torrentSearch/TorrentSearchService.js';
import { FakeTorrentSearchService } from './torrentSearch/FakeTorrentSearchService.js';

container.register<ITorrentSearchService>('ITorrentSearchService', {
    useClass: TorrentSearchService
});
