var my_news = [
    {
        author:  'Саша Печкин',
        text:    'Хочется быть взрослым адекватным человеком',
        bigText: 'Хочется быть взрослым адекватным человеком, но с горочки на картоночке уиииии!'
    },
    {
        author:  'Просто Вася',
        text:    'Вся жизнь театр',
        bigText: 'Вся жизнь театр, а я просто упал со сцены'
    },
    {
        author:  'Гость',
        text:    'На работу хожу очень быстро',
        bigText: 'На работу хожу очень быстро, чтобы не передумать'
    }
];

var Article = React.createClass({
    propTypes: {
        data: React.PropTypes.shape({
            author:  React.PropTypes.string.isRequired,
            text:    React.PropTypes.string.isRequired,
            bigText: React.PropTypes.string.isRequired
        })
    },

    getInitialState: function () {
        return {
            visible: false
        };
    },

    readmoreClick: function (e) {
        e.preventDefault();
        this.setState({visible: true});
    },

    render: function () {
        var author  = this.props.data.author,
            text    = this.props.data.text,
            bigText = this.props.data.bigText,
            visible = this.state.visible; // считываем значение переменной из состояния компонента

        return (
            <div className="article">
                <p className="news__author">{author}</p>
                <p className={'news__text ' + (visible ? 'none' : '')}>{text}</p>
                {/* не показывать ссылку, если visible === true */}
                <a href="#"
                   onClick={this.readmoreClick}
                   className={'news__readmore ' + (visible ? 'none' : '')}>
                   Подробнее
                </a>
                {/* не показывать весь текст, если visible === false */}
                <p className={'news__big-text ' + (visible ? '' : 'none')}>{bigText}</p>
            </div>
        )
    }
})
var News    = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired
    },

    getInitialState: function() {
        return {
            counter: 0
        }
    },

    render: function () {
        var data = this.props.data;
        var newsTemplate;

        if (data.length > 0) {
            newsTemplate = data.map(function (item, index) {
                return (
                    <div key={index}>
                        <Article data={item}/>
                    </div>
                )
            });
        } else {
            newsTemplate = <p>К сожалению новостей нет</p>
        }

        return (
            <div className="news">
                {newsTemplate}
            <strong
                className={'news__count ' + (data.length > 0 ? '' : 'none')}>
                Всего новостей: {data.length}
            </strong>
            </div>
        );
    }
})

// --- добавил test input ---
var Add = React.createClass({
    getInitialState: function() { //устанавливаем начальное состояние (state)
        return {
            agreeNotChecked: true,
            authorIsEmpty: true,
            textIsEmpty: true
        };
    },

    componentDidMount: function() { //ставим фокус в input
        ReactDOM.findDOMNode(this.refs.author).focus();
    },

    onBtnClickHandler: function() {
        e.preventDefault();
        var author = ReactDOM.findDOMNode(this.refs.author).value;
        var text = ReactDOM.findDOMNode(this.refs.text).value;
        alert(author + '\n' + text);
    },

    onCheckRuleClick: function(e) {
        this.setState({btnIsDisabled: !this.state.btnIsDisabled}); //устанавливаем значение в state
    },

    onFieldChange: function(fieldName, e) {
        if (e.target.value.trim().length > 0) {
            this.setState({[''+fieldName]:false})
        } else {
            this.setState({[''+fieldName]:true})
        }
    },

    render: function() {

        var agreeNotChecked = this.state.agreeNotChecked,
            authorIsEmpty = this.state.authorIsEmpty,
            textIsEmpty = this.state.textIsEmpty;

        return (
            <form className='add cf'>
                <input
                    type='text'
                    className='add__author'
                    onChange={this.onFieldChange.bind(this, 'authorIsEmpty')}
                    placeholder='Ваше имя'
                    ref='author'
                />
                <textarea
                    className='add__text'
                    onChange={this.onFieldChange.bind(this, 'textIsEmpty')}
                    placeholder='Текст новости'
                    ref='text'>
                </textarea>
                <label className='add__checkrule'>
                    <input type="checkbox" ref='checkrule' onChange={this.onCheckRuleClick}/>Я согласен с правилами
                </label>
                <button
                    className='add__btn'
                    onClick={this.onBtnClickHandler}
                    ref='alert_button'
                    disabled={agreeNotChecked || authorIsEmpty || textIsEmpty}>
                    Показать alert
                </button>
            </form>
        );
    }
});

var App = React.createClass({
    render: function () {
        return (
            <div className="app">
                <Add /> {/* добавили вывод компонента */}
                <h3>Новости</h3>
                <News data={my_news}/>
            </div>
        )
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
