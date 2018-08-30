// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

import { createElement, Pagination, List } from '@plesk/ui-library';
import { ServerList } from '../ServerList';
import { shallow } from 'enzyme';

const generateData = length => [...Array(length)].map((_, index) => ({ key: String(index), column1: index }));

describe('ServerList', () => {
    it('renders correctly', () => {
        const data = generateData(5);
        const promise = Promise.resolve({ data, totalItems: data.length });
        const get = jest.fn(() => promise);

        const wrapper = shallow(
            <ServerList
                config={{
                    baseUrl: '',
                }}
                api={{
                    get,
                }}
                columns={[{
                    key: 'column1',
                    title: 'Column1',
                }]}
                action="/api/test"
            />
        );

        expect.assertions(4);

        return promise.then(() => {
            expect(get).toHaveBeenCalledWith('/api/test', { pageSize: 25, pageNumber: 1 });
            expect(wrapper.state()).toMatchObject({
                pageNumber: 1,
                totalPages: 1,
                sortColumn: null,
                sortDirection: 'ASC',
            });
            expect(wrapper.state().data).toEqual(data);
            expect(wrapper).toMatchSnapshot();
        });
    });

    it('render pagination correctly', () => {
        const data = generateData(60);
        const promise = Promise.resolve({ data: data.slice(0, 25), totalItems: data.length });
        const get = jest.fn(() => promise);

        const wrapper = shallow(
            <ServerList
                config={{
                    baseUrl: '',
                }}
                api={{
                    get,
                }}
                columns={[{
                    key: 'column1',
                    title: 'Column1',
                }]}
                action="/api/test"
            />
        );

        expect.assertions(5);

        return promise
            .then(() => {
                expect(get).toHaveBeenCalledWith('/api/test', { pageSize: 25, pageNumber: 1 });
                expect(wrapper.state()).toMatchObject({
                    pageNumber: 1,
                    totalPages: 3,
                });
                expect(wrapper).toMatchSnapshot();

                wrapper.find(Pagination).simulate('select', 2);
                expect(get).toHaveBeenCalledWith('/api/test', { pageSize: 25, pageNumber: 2 });
                expect(wrapper.state()).toMatchObject({
                    pageNumber: 2,
                    totalPages: 3,
                });
            });
    });

    it('render sort correctly', () => {
        const data = generateData(60);
        const promise = Promise.resolve({ data: data.slice(0, 25), totalItems: data.length });
        const get = jest.fn(() => promise);

        const wrapper = shallow(
            <ServerList
                config={{
                    baseUrl: '',
                }}
                api={{
                    get,
                }}
                columns={[{
                    key: 'column1',
                    title: 'Column1',
                }]}
                action="/api/test"
                defaultSortColumn="column1"
            />
        );

        expect.assertions(5);

        return promise.then(() => {
            expect(get).toHaveBeenCalledWith('/api/test', {
                pageSize: 25,
                pageNumber: 1,
                sortColumn: 'column1',
                sortDirection: 'ASC',
            });
            expect(wrapper.state()).toMatchObject({
                pageNumber: 1,
                totalPages: 3,
                sortColumn: 'column1',
                sortDirection: 'ASC',
            });
            expect(wrapper).toMatchSnapshot();

            wrapper.find(List).simulate('sortChange', { sortColumn: 'column1', sortDirection: 'DESC' });
            expect(get).toHaveBeenCalledWith('/api/test', {
                pageSize: 25,
                pageNumber: 1,
                sortColumn: 'column1',
                sortDirection: 'DESC',
            });
            expect(wrapper.state()).toMatchObject({
                sortColumn: 'column1',
                sortDirection: 'DESC',
            });
        });
    });
});
