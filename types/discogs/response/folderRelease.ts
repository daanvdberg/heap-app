import { EntityArtist } from './entityArtist';
import { Company, Format } from './release';

export interface FolderRelease {
	basic_information: {
		artists: EntityArtist[];
		cover_image: string;
		formats: Format[];
		genres: string[];
		id: number;
		labels: Company[];
		master_id: number;
		master_url: string;
		resource_url: string;
		styles?: string[];
		thumb: string;
		title: string;
		year: number;
	};
	date_added: Date | null;
	folder_id: number;
	id: number;
	instance_id: number;
	notes: Note[];
	rating: number;
}

export interface Note {
	field_id: number;
	value: string;
}
