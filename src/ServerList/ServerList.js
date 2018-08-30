// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

import { createElement, Component, List, Pagination, PropTypes } from '@plesk/ui-library';
import { withApi } from '../Api';
import { withConfig } from '../Config';

export class ServerList extends Component {
    static propTypes = {
        config: PropTypes.shape({
            baseUrl: PropTypes.string.isRequired,
        }).isRequired,
        api: PropTypes.shape({
            get: PropTypes.func.isRequired,
        }).isRequired,
        action: PropTypes.string.isRequired,
        columns: PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.string.isRequired,
            title: PropTypes.node,
            render: PropTypes.func,
            sortable: PropTypes.bool,
        })).isRequired,
        defaultPageSize: PropTypes.number,
        defaultSortColumn: PropTypes.string,
        defaultSortDirection: PropTypes.oneOf(['ASC', 'DESC']),
        listProps: PropTypes.shape(),
        paginationProps: PropTypes.shape(),
    };

    static defaultProps = {
        listProps: {},
        paginationProps: {},
        defaultPageSize: 25,
        defaultSortColumn: null,
        defaultSortDirection: 'ASC',
    };

    state = {
        pageSize: this.props.defaultPageSize,
        pageNumber: 1,
        totalPages: 0,
        sortColumn: this.props.defaultSortColumn,
        sortDirection: this.props.defaultSortDirection,
        data: [],
    };

    componentDidMount() {
        this.fetchItems();
    }

    fetchItems = () => {
        const { config, action, api } = this.props;
        const { pageSize, pageNumber, sortColumn, sortDirection } = this.state;
        const params = {
            pageSize,
            pageNumber,
        };

        if (sortColumn) {
            params.sortColumn = sortColumn;
            params.sortDirection = sortDirection;
        }

        api.get(`${config.baseUrl}${action}`, params).then(({ data, totalItems }) => {
            this.setState({
                data,
                totalPages: Math.ceil(totalItems / pageSize),
            });
        });
    };

    handleSelectPage = pageNumber => {
        const { paginationProps } = this.props;
        const { onSelect } = paginationProps;

        if (typeof onSelect === 'function' && onSelect(pageNumber) === false) {
            return;
        }

        this.setState({
            pageNumber,
        }, () => {
            this.fetchItems();
        });
    };

    handleSortChange = params => {
        const { listProps } = this.props;
        const { onSortChange } = listProps;

        if (typeof onSortChange === 'function' && onSortChange(params) === false) {
            return;
        }

        this.setState(params, () => this.fetchItems());
    };

    renderPagination = () => {
        const { paginationProps } = this.props;
        const { totalPages, pageNumber } = this.state;

        if (totalPages < 2) {
            return null;
        }

        return (
            <Pagination
                {...paginationProps}
                total={totalPages}
                current={pageNumber}
                onSelect={this.handleSelectPage}
            />
        );
    };

    render() {
        const {
            config,
            action,
            api,
            columns,
            defaultPageSize,
            defaultSortColumn,
            defaultSortDirection,
            listProps,
            paginationProps,
            ...props
        } = this.props;
        const { data, sortColumn, sortDirection } = this.state;

        return (
            <div {...props}>
                <List
                    {...listProps}
                    columns={columns}
                    sortColumn={sortColumn}
                    sortDirection={sortDirection}
                    onSortChange={this.handleSortChange}
                    data={data}
                />
                {this.renderPagination()}
            </div>
        );
    }
}

export default withApi(withConfig(ServerList));
