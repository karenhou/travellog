import React, { Component } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#80cbc4",
    color: theme.palette.common.black
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
  counter += 1;
  return { id: counter, name, calories, fat, carbs, protein };
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}
function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  },
  button: {
    marginRight: theme.spacing.unit * 2
  }
});

class TripTable extends Component {
  state = {
    order: "asc",
    orderBy: "From",
    page: 0,
    rowsPerPage: 5
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const trip = this.props.trip;
    const { classes } = this.props;
    const { rowsPerPage, page, order, orderBy } = this.state;

    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, trip.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>Country</CustomTableCell>
                <CustomTableCell>From</CustomTableCell>
                <CustomTableCell>To</CustomTableCell>
                <CustomTableCell>Actions</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stableSort(trip, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow className={classes.row} key={row._id}>
                      <CustomTableCell component="th" scope="row">
                        {row.country}
                      </CustomTableCell>
                      <CustomTableCell>
                        <Moment format="YYYY/MM/DD">{row.from}</Moment>
                      </CustomTableCell>

                      <CustomTableCell>
                        <Moment format="YYYY/MM/DD">{row.to}</Moment>
                      </CustomTableCell>
                      <CustomTableCell>
                        <Button
                          size="small"
                          variant="contained"
                          color="secondary"
                          className={classes.button}>
                          <Icon>edit</Icon>
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          color="secondary"
                          className={classes.button}>
                          <Icon>delete</Icon>
                        </Button>
                      </CustomTableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={trip.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

TripTable.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TripTable));
