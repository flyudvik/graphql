const graphql = require('graphql');
const _= require('lodash');
const User = require('../models/user');
const Short = require('../models/short');

const { 
	GraphQLObjectType, 
	GraphQLString, 
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull
} = graphql;

const UserType = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		id: {type: GraphQLID},
		name: {type: GraphQLString},
		slack: {type: GraphQLString},
		departmentId: {type: GraphQLID},
		short: {
			type: ShortType,
			resolve(parent, args){
				//return _.find(shorts, {id: parent.shortid})
				return Short.findById(parent.departmentId);
			}
		}
	})
});

const ShortType = new GraphQLObjectType({
	name: 'Short',
	fields: () => ({
		id: {type: GraphQLID},
		name: {type: GraphQLString},
		short: {type: GraphQLInt},
		users: {
			type: new GraphQLList(UserType),
			resolve(parent, args){
				//return _.filter(users, {shortid: parent.id})
				return User.find({departmentId:parent.name});
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		user: {
			type: UserType,
			args: {id: {type: GraphQLID}},
			resolve(parent, args){
				//get date from db / other source
				//return _.find(users, {id: args.id});
				return User.findById(args.id);
			}
		},
		short: {
			type: new GraphQLList(ShortType),
			args: {name: {type: GraphQLString}},
			resolve(parent, args) {
				//return _.find(shorts, {id:args.id});
				return Short.find({name: args.name});
			}
		},
		users: {
			type: new GraphQLList(UserType),
			resolve(parent, args){
				//return users;
				return User.find({});
			}
		},
		shorts: {
			type: new GraphQLList(ShortType),
			resolve(parent, args){
				//return shorts;
				return Short.find({});
			}
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addShort: {
			type: ShortType,
			args: {
				name: { type:GraphQLString },
				short: { type: GraphQLInt }
			},
			resolve(parent, args){
				let short = new Short({
					name: args.name,
					short: args.short
				});
				return short.save();
			}
		},
		addUser: {
			type: UserType,
			args: {
				name: {type: GraphQLString},
				slack: {type: GraphQLString},
				departmentId: {type: GraphQLString},
				reports: {type: GraphQLInt}
			},
			resolve(parent,args){
				let user = new User ({
					name: args.name,
					slack: args.slack,
					departmentId: args.departmentId,
					reports: args.reports
				});
				
				return user.save();
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});