import 'reflect-metadata';
import { container } from 'tsyringe';
import ITorrentSearchService from './torrentSearch/services/contracts/ITorrentSearchService.js';
import TorrentSearchService from './torrentSearch/services/TorrentSearchService.js';
import { FakeTorrentSearchService } from './torrentSearch/services/FakeTorrentSearchService.js';

container.register<ITorrentSearchService>('ITorrentSearchService', {
    useClass: TorrentSearchService
});
