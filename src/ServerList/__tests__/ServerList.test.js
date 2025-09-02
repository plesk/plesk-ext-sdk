// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

import { Pagination, List } from '@plesk/ui-library';
import { ServerList } from '../ServerList';
import { shallow } from 'enzyme';

const generateData = length => [...Array(length)].map((_, index) => ({ key: String(index), column1: index }));

describe('ServerList', () => {
    let props;

    beforeEach(() => {
        props = {
            config: {
                baseUrl: '',
            },
            api: {
                get: jest.fn(),
            },
            statusMessages: { add: jest.fn() },
            columns: [{
                key: 'column1',
                title: 'Column1',
            }],
            action: '/api/test',
        };
    });

    test('renders correctly', () => {
        const data = generateData(5);
        const promise = Promise.resolve({ data, totalItems: data.length });
        props.api.get.mockReturnValueOnce(promise);
        const wrapper = shallow(
            <ServerList
                {...props}
            />,
        );

        expect.assertions(4);

        return promise.then(() => {
            expect(props.api.get).toHaveBeenCalledWith('/api/test', { pageSize: 25, pageNumber: 1 });
            expect(wrapper.state()).toMatchObject({
                pageNumber: 1,
                totalPages: 1,
                sortColumn: null,
                sortDirection: 'ASC',
            });
            expect(wrapper.state().data).toStrictEqual(data);
            expect(wrapper).toMatchSnapshot();
        });
    });

    test('renders pagination correctly', () => {
        const data = generateData(60);
        const promise = Promise.resolve({ data: data.slice(0, 25), totalItems: data.length });
        props.api.get.mockReturnValueOnce(promise);
        props.api.get.mockReturnValueOnce(promise);
        const wrapper = shallow(
            <ServerList
                {...props}
            />,
        );

        expect.assertions(5);

        return promise
            .then(() => {
                expect(props.api.get).toHaveBeenCalledWith('/api/test', { pageSize: 25, pageNumber: 1 });
                expect(wrapper.state()).toMatchObject({
                    pageNumber: 1,
                    totalPages: 3,
                });
                expect(wrapper).toMatchSnapshot();

                wrapper.find(Pagination).simulate('select', 2);

                expect(props.api.get).toHaveBeenCalledWith('/api/test', { pageSize: 25, pageNumber: 2 });
                expect(wrapper.state()).toMatchObject({
                    pageNumber: 2,
                    totalPages: 3,
                });
            });
    });

    test('renders sort correctly', () => {
        const data = generateData(60);
        const promise = Promise.resolve({ data: data.slice(0, 25), totalItems: data.length });
        props.api.get.mockReturnValueOnce(promise);
        props.api.get.mockReturnValueOnce(promise);
        const wrapper = shallow(
            <ServerList
                {...props}
                defaultSortColumn="column1"
            />,
        );

        expect.assertions(5);

        return promise.then(() => {
            expect(props.api.get).toHaveBeenCalledWith('/api/test', {
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

            expect(props.api.get).toHaveBeenCalledWith('/api/test', {
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

    test('renders errors correctly', () => {
        const promise = Promise.resolve({ status: 'error', errors: ['Some error'] });
        props.api.get.mockReturnValueOnce(promise);
        const wrapper = shallow(
            <ServerList
                {...props}
            />,
        );

        expect.assertions(3);

        return promise.then(() => {
            expect(wrapper.state()).toMatchObject({
                totalPages: 0,
            });
            expect(props.statusMessages.add).toHaveBeenCalledWith({ intent: 'danger', message: 'Some error' });
            expect(wrapper).toMatchSnapshot();
        });
    });
});
