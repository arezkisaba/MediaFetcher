import 'reflect-metadata';
import { container } from 'tsyringe';
import ITorrentSearchService from './torrentSearch/contracts/ITorrentSearchService';
import TorrentSearchService from './torrentSearch/TorrentSearchService';
import { FakeTorrentSearchService } from './torrentSearch/FakeTorrentSearchService';

container.register<ITorrentSearchService>('ITorrentSearchService', {
    useClass: TorrentSearchService
});
