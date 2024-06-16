import 'reflect-metadata';
import { container } from 'tsyringe';
import ITorrentSearchService from './torrentSearch/contracts/ITorrentSearchService';
import TorrentSearchService from './torrentSearch/TorrentSearchService';

container.register<ITorrentSearchService>('ITorrentSearchService', {
    useClass: TorrentSearchService
});
