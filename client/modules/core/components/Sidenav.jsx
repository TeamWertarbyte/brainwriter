import React from 'react'
import { connect } from 'react-redux'
import { Drawer } from 'material-ui'
import ProfileMenu from '../containers/ProfileMenu'
import toggleMenu from '../actions'

class SidenavImpl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileView: window.innerWidth < 1024,
      open: false,
      loginOpen: false,
      registerOpen: false
    }

    this.handleResize = () => {
      this.setState({
        mobileView: window.innerWidth < 1024
      })
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleClose() {
    if (this.state.mobileView) {
      this.props.dispatch(toggleMenu())
    }
  }

  render() {
    return (
      <div>
        <Drawer
          docked={!this.state.mobileView}
          open={this.state.mobileView ? this.props.menuOpen : true}
          onRequestChange={() => this.handleClose()}
        >
          <ProfileMenu />
        </Drawer>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  menuOpen: state.menu.menuOpen
})

export default connect(mapStateToProps)(SidenavImpl)
