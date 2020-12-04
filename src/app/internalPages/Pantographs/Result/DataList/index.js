import React from "react";
import PantoCheckButton from "../../../../components/PantoCheckButton";
import Data from "./Data";
import { Scrollbars } from "react-custom-scrollbars";
import PantoButton from "../../../../components/PantoButton";
import PantoSelectList from "../../../../components/PantoSelectList";

import { connect } from "react-redux";
import { isDisabled, isFocused } from "../../DataHandler";
import * as actionTypes from "../../DataHandler/_actions";

class DataList extends React.Component {
  renderThumb({ style, ...props }) {
    const thumbStyle = {
      backgroundColor: "#4467A5",
      width: "4px",
      padding: 0,
      borderRadius: "5px",
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  }

  renderTrackVertical({ style, ...props }) {
    const thumbStyle = {
      position: "absolute",
      width: "4px",
      right: "2px",
      bottom: "2px",
      top: "0",
      borderRadius: "5px",
      backgroundColor: "#2B2C2E",
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  }

  renderView({ style, ...props }) {
    const thumbStyle = {
      marginRight: "-30px",
      marginBottom: "-30px",
      paddingRight: "13px",
      paddingBottom: "13px",
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  }

  renderThumbX({ style, ...props }) {
    const thumbStyle = {
      display: "none",
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.in_queue !== this.props.in_queue) {
      this.props.setOpenTools(null);
    }
    if (prevProps.signal_highlight !== this.props.signal_highlight) {
      const perLi = 70;
      this.refs.scrollbars_datalist.view.scroll({
        top: this.props.signal_highlight * perLi,
        left: 0,
        behavior: "smooth",
      });
      setTimeout(() => {
        this.props.setOpenTools(this.props.signal_highlight);
      }, 300);
    }
  }

  render() {
    const {
      isFocused,
      setFocused,
      setBlurred,
      isDisabled,

      sorting,
      sorting_list,

      signal_list,
      signals_selected,

      setSorting,

      isOpenTool,
      setOpenTools,
      setCloseTools,

      isSelect,
      selectSignal,

      isSelectAll,
      selectAll,

      addDownloadQueue,
      inDownloading,

      setRequestVideo,
      isRequestingVideo,

      isRequestedVideo,
      isUploadedVideo,

      showSignalDetail,
    } = this.props;

    const openTool = {
      isOpen: isOpenTool,
      open: setOpenTools,
      close: setCloseTools,
    };

    const selection = {
      isSelect: isSelect,
      select: selectSignal,
    };

    const tools = {
      downloadSignal: {
        process: addDownloadQueue,
        processing: inDownloading,
      },
      moreDetail: {
        process: showSignalDetail,
        processing: (ID) => {
          return false;
        },
      },
      requestVideo: {
        process: setRequestVideo,
        processing: isRequestingVideo,
        requested: isRequestedVideo,
        uploaded: isUploadedVideo,
      },
    };

    const data_count = signal_list.length;
    const $data_list = signal_list.map((item, i) => {
      return (
        <Data
          index={i}
          train_id={this.props.train_id}
          device_id={this.props.device_id}
          openTool={{ ...openTool }}
          selection={{ ...selection }}
          tools={{ ...tools }}
          {...item}
        />
      );
    });

    return (
      <div className="data-list">
        <h6>
          {data_count > 0 ? [<b>{data_count}</b>, " signals"] : "no signal"}
        </h6>

        <div className="data-box">
          <div className="data-tools-section">
            <PantoCheckButton
              value={isSelectAll}
              label={<label>Select All</label>}
              onChange={selectAll}
              disabled={isDisabled("select_all")}
            />

            <div className="sorting">
              <label>Sort by</label>
              <PantoSelectList
                open={isFocused("sorting")}
                onOpen={() => {
                  setFocused("sorting");
                }}
                onClose={() => {
                  setBlurred("sorting");
                }}
                disabled={isDisabled("sorting")}
                onChange={setSorting}
                placeholder={"sort"}
                items={sorting_list}
                value={sorting}
                height={25}
              />
            </div>

            <PantoButton
              onClick={() => {
                addDownloadQueue(signals_selected);
                selectAll();
              }}
              disabled={isDisabled("download_signals")}
            >
              Download Signals
            </PantoButton>
          </div>

          <div className="data-section hide-scrollbar">
            <Scrollbars
              ref="scrollbars_datalist"
              renderThumbVertical={this.renderThumb}
              renderTrackVertical={this.renderTrackVertical}
              renderThumbHorizontal={this.renderThumbX}
              renderView={this.renderView}
              hideTracksWhenNotNeeded
            >
              <ul>{$data_list}</ul>
            </Scrollbars>
          </div>
        </div>
      </div>
    );
  }
}

const stt2prp = (state) => {
  return {
    train_id: state.train_id,
    device_id: state.device_id,

    isDisabled: (item) => {
      return isDisabled(state, item);
    },
    isFocused: (item) => {
      return isFocused(state, item);
    },

    sorting_list: state.sorting_list,
    sorting: state.sorting,

    signal_list: state.signal_list,
    signals_selected: state.signals_selected,

    download_queue: state.download_queue,
    in_queue: state.in_queue,

    isSelectAll:
      state.signals_selected.length > 0
        ? state.signals_selected.length === state.signal_list.length
          ? true
          : "some"
        : false,

    isHighlight: (ID) => {
      return state.signal_highlight === ID;
    },
    signal_highlight: state.signal_highlight,

    isOpenTool: (ID) => {
      return (
        state.request_video === ID ||
        state.in_queue.includes(ID) ||
        state.open_tools === ID
      );
    },
    isSelect: (ID) => {
      return state.signals_selected.length > 0
        ? state.signals_selected.includes(ID)
        : false;
    },

    inDownloading: (ID) => {
      return state.in_queue.includes(ID);
    },

    isRequestingVideo: (ID) => {
      return state.request_video === ID;
    },
    isRequestedVideo: (ID) => {
      return false;
    },
    isUploadedVideo: (ID) => {
      return false;
    },
  };
};

const dispatch2prp = (dispatch, state) => {
  return {
    set: (state, value) => dispatch({ type: actionTypes.SET, state, value }),

    setFocused: (item) => dispatch({ type: actionTypes.SET_FOCUSED, item }),
    setBlurred: (item) => dispatch({ type: actionTypes.SET_BLURRED, item }),

    setSorting: (value) =>
      dispatch({ type: actionTypes.CHANGE_SORTING, value }),

    setOpenTools: (value) =>
      dispatch({ type: actionTypes.CHANGE_OPEN_TOOL, value }),
    setCloseTools: () => dispatch({ type: actionTypes.CLOSE_OPEN_TOOL }),

    selectSignal: (ID, value) =>
      dispatch({ type: actionTypes.SELECT_SIGNAL, ID, value }),

    selectAll: () => dispatch({ type: actionTypes.SELECT_ALL }),

    addDownloadQueue: (queue) =>
      dispatch({ type: actionTypes.ADD_DOWNLOAD_QUEUE, queue }),

    setRequestVideo: (value) =>
      dispatch({ type: actionTypes.REQUEST_VIDEO, value }),

    showSignalDetail: (value) =>
      dispatch({ type: actionTypes.SIGNAL_DETAIL, value }),
  };
};

export default connect(stt2prp, dispatch2prp)(DataList);
